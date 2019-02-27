import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SubscriptionLike } from 'rxjs';
import { Field, FormRule, FormHelper, Validation } from '@skysmack/ng-ui';
import { EditorNavService } from './../../common/container/editor-nav.service';

@Component({
  selector: 'ss-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnDestroy {

  @Input() public fields: Field[];
  @Input() public rules: FormRule[];
  @Input() public validation: Validation;
  @Input() public buttonText = 'Submit';

  public fh: FormHelper;

  public subscription: SubscriptionLike;

  @Output() public submitted: EventEmitter<FormHelper> = new EventEmitter();

  constructor(public fb: FormBuilder, public editorNavService: EditorNavService) { }

  ngOnInit() {
    this.createForm();
    setTimeout(() => {
      this.editorNavService.showEditorNav();
    }, 0);
  }

  public trackByFieldKey(field: Field) {
    return field ? field.key : undefined;
  }

  public createForm(): void {
    const formHelper = this.createFormHelper();
    this.disableFields(this.fields, formHelper);
    this.validateOnChange(formHelper);
    this.fh = formHelper;
  }

  public onSubmit() {
    this.submitted.emit(this.fh);
  }

  /**
   * Creates a form helper from a group of fields.
   */
  private createFormHelper() {
    const formGroup = {};
    this.fields.forEach(field => {
      formGroup[field.key] = field.validators ? [field.value, Validators.compose(field.validators)] : field.value;
    });
    const formHelper = new FormHelper(this.fb.group(formGroup, { validator: this.validation.formValidators }), this.validation);
    return formHelper;
  }

  /**
   * Disable fields set to be disabled
   */
  private disableFields(fields: Field[], formHelper: FormHelper) {
    fields.filter(field => field.disabled === true).forEach(field => {
      const control = formHelper.form.controls[field.key];
      if (control) {
        control.disable();
      }
    });
  }

  /**
   * Subscribes to any changes in the form. The form is validated when a change occurs or the form is submitted.
   */
  private validateOnChange(formHelper: FormHelper) {
    this.subscription = formHelper.form.valueChanges.subscribe(() => formHelper.validateForm(formHelper.form));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
