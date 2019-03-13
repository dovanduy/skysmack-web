import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Field, FormRule, FormHelper, Validation } from '@skysmack/ng-ui';
import { EditorNavService } from './../../common/container/editor-nav.service';
import { GlobalProperties, SubscriptionHandler } from '@skysmack/framework';

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
  @Output() public submitted: EventEmitter<FormHelper> = new EventEmitter();

  public production = GlobalProperties.production;
  public fh: FormHelper;
  public subscriptionHander = new SubscriptionHandler();

  constructor(public fb: FormBuilder, public editorNavService: EditorNavService) { }

  ngOnInit() {
    // Init form w. validation check
    this.fh = new FormHelper(new FormGroup({}, this.validation.formValidators), this.validation);
    this.validateOnChange(this.fh);

    // Update the form (FormGroup) on field changes
    this.subscriptionHander.register(this.fields$.subscribe(fields => this.updateForm(fields)));

    // Show sidebar
    setTimeout(() => {
      if (!this.noSidebar) {
        this.editorNavService.showEditorNav();
      }
    }, 0);
  }

  ngOnDestroy() {
    this.subscriptionHander.unsubscribe();
  }

  public trackByFieldKey(field: Field) {
    return field ? field.key : undefined;
  }

  public updateForm(fields: Field[]): void {
    // Update the forms internal controls
    fields.forEach(field => {
      // Add new fields
      if (!this.fh.form.contains(field.key)) {
        const fieldFormControl = field.validators ? new FormControl(field.value, Validators.compose(field.validators)) : new FormControl(field.value);
        if (field.disabled) {
          fieldFormControl.disable();
        }
        this.fh.form.addControl(field.key, fieldFormControl);
      }
    });
  }

  public onSubmit() {
    this.submitted.emit(this.fh);
  }

  /**
   * Subscribes to any changes in the form. The form is validated when a change occurs or the form is submitted.
   */
  private validateOnChange(formHelper: FormHelper) {
    this.subscriptionHander.register(formHelper.form.valueChanges.subscribe(() => formHelper.validateForm(formHelper.form)));
  }
}
