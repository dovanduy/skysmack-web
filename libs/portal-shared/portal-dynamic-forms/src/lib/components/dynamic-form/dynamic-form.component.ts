import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { GlobalProperties, SubscriptionHandler, LocalObject, StrIndex } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map, take, tap, debounceTime, delay, filter } from 'rxjs/operators';
import { Field, FormRule, Validation, FormHelper } from '@skysmack/ng-dynamic-forms';
import { CloseWarningService, EditorNavService } from '@skysmack/portal-ui';

@Component({
  selector: 'ss-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input() public fields$: Observable<Field[]>;
  @Input() public rules: FormRule[];
  @Input() public validation: Validation;
  @Input() public buttonText = 'Submit';
  @Input() public noSidebar: boolean;
  @Input() public disableButton: boolean = false;
  @Input() public removeSubmitButton: boolean = false;
  @Input() public removeCloseButton: boolean = false;
  @Output() public submitted: EventEmitter<FormHelper> = new EventEmitter();

  // Prevents multiple gets
  public requestedDependencies: StrIndex<boolean> = {};

  public editorItem$: Observable<LocalObject<any, any>>;
  public production = GlobalProperties.production;
  public fh: FormHelper;
  private subscriptionHandler = new SubscriptionHandler();
  private submitting: boolean;

  constructor(
    public fb: FormBuilder,
    public skysmackStore: NgSkysmackStore,
    private editorNavService: EditorNavService,
    private closeWarningService: CloseWarningService
  ) { }

  ngOnInit() {
    // Init form w. validation check
    this.fh = new FormHelper(new FormGroup({}, this.validation.formValidators), this.validation);
    this.validateOnChange(this.fh);

    this.editorItem$ = this.skysmackStore.getEditorItem(true);

    // Update the fields and  form (FormGroup) on field changes
    this.fields$ = this.fields$.pipe(
      delay(0), // Prevents ExpressionChanged error
      map(fields => {
        this.initForm(fields);
        return fields.filter(field => field.includeInForm);
      }),
      tap(fields => {
        // If field values are updated, the form group needs to have its values updated as well
        // This is especially important if the field is provided and contains async api calls.
        if (!this.submitting) { // Don't update the form values when submitting.
          fields.forEach(field => {
            const fieldValue = field && this.fh.form.controls[field.key].value;
            if (fieldValue === null || fieldValue === undefined) {
              this.fh.form.controls[field.key].setValue(field.value);
            }
          });
        }
      })
    );

    // If the form changes, show a close warning
    this.closeWarningOnFormChange();
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
    this.closeWarningService.stopAskingBeforeClosing();
  }

  public onClose() {
    if (this.closeWarningService.formChanged) {
      this.subscriptionHandler.register(this.closeWarningService.closeSidebar().pipe(
        filter(x => x),
        take(1),
        map(() => this.editorNavService.hideEditorNav())
      ).subscribe());
    } else {
      this.editorNavService.hideEditorNav();
    }
  }

  public trackByFieldKey(_index: number, field: Field) {
    return `${field.key}:${JSON.stringify(field.value)}`;
  }

  public initForm(fields: Field[]): void {
    // Update the forms internal controls
    fields.forEach(field => {

      this.getFieldDependencies(field);

      if (field.includeInForm) {
        // Add new fields
        const fieldFormControl = field.validators ? new FormControl(field.value, Validators.compose(field.validators)) : new FormControl(field.value);

        if (field.disabled) {
          fieldFormControl.disable();
        }
        if (!this.fh.form.contains(field.key)) {
          this.fh.form.addControl(field.key, fieldFormControl);
        } else {
          // const fieldFormControl = this.fh.form.get(field.key);
          // this.fh.form.setControl(field.key, fieldFormControl);
        }
      }
    });
  }

  public onSubmit = () => {
    this.submitting = true;
    this.closeWarningService.formChanged = false; // Disable form changed checks while submitting.
    this.subscriptionHandler.register(this.fields$.pipe(
      take(1),
      // Remove all fields not to be included in the request.
      map(fields => fields.map(field => field.includeInRequest ? field : this.fh.form.removeControl(field.key))),
      map(() => this.submitted.emit(this.fh)),
      tap(() => this.submitting = false),
      tap(() => setTimeout(() => { this.closeWarningService.formChanged = true; }, 100)),
    ).subscribe());
  }

  /**
     * This method is only used for development!
     * Please keep in sync with formatExtendedData() method in form-base-component.ts
     */
  public previewExtendedData(): StrIndex<any> {
    if (this.fh && this.fh.form) {
      const formValuesClone = { ...this.fh.form.getRawValue() };

      Object.keys(formValuesClone).forEach(key => {
        if (!key.split('__')[1]) {
          delete formValuesClone[key];
        }
        // Format extended data
        const extendedDataKeyParts = key.split('__');
        const packagePath = extendedDataKeyParts[1];
        const keyProp = extendedDataKeyParts[2];
        const extendedData = formValuesClone[key];

        // If packagePath is defined, we have some extended data.
        if (packagePath) {

          // Set the extendedData prop if it hasn't been created yet.
          if (!formValuesClone['extendedData']) {
            formValuesClone['extendedData'] = {};
          }

          if (!formValuesClone['extendedData'][packagePath]) {
            // We havent set any data yet for this package. Create its dictionary.
            formValuesClone['extendedData'][packagePath] = {};
            // Set data for the current field
            formValuesClone['extendedData'][packagePath] = extendedData;
          } else {
            // Extented data for package already exists. Set data for the current field
            formValuesClone['extendedData'][packagePath] = extendedData;
          }

          // Deleted the individual, dot notated extended data, as it is no longer needed,
          // and shouldn't be posted to the backend
          delete formValuesClone[key];
        }
      });

      return formValuesClone;
    } else {
      return {};
    }
  }

  private getFieldDependencies(field: Field) {
    if (!this.requestedDependencies[field.key] && field.getDependencies) {
      this.requestedDependencies[field.key] = true;
      field.getDependencies();
    }
  }

  /**
   * Subscribes to any changes in the form. The form is validated when a change occurs or the form is submitted.
   */
  private validateOnChange(formHelper: FormHelper) {
    this.subscriptionHandler.register(formHelper.form.valueChanges.subscribe(() => formHelper.validateForm(formHelper.form)));
  }

  private closeWarningOnFormChange() {
    let originalFormValue = null;

    // When form value changes...
    this.subscriptionHandler.register(this.fh.form.valueChanges.pipe(
      debounceTime(100),
      tap(formValues => {
        const strValues = JSON.stringify(formValues);

        // Copy the original input
        if (!originalFormValue) {
          originalFormValue = strValues;
        }

        if (originalFormValue !== strValues) {
          // If the input has changed, ask before leaving
          this.closeWarningService.startAskingBeforeClosing();
          this.closeWarningService.formChanged = true;
        } else if (originalFormValue && originalFormValue === strValues) {
          // If the input equals the original, stop asking before leaving
          this.closeWarningService.stopAskingBeforeClosing();
          this.closeWarningService.formChanged = false;
        }
      })
    ).subscribe());
  }

}
