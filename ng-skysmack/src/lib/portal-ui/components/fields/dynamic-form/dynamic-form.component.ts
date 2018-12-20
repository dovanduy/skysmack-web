import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionLike } from 'rxjs';
import { Field } from './../../../fields/field';
import { FormRule } from './../../../forms/form-rule';
import { FormHelper } from './../../../forms/form-helper';
import { Validation } from 'lib/portal-ui/forms/validation';

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

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    console.log(this.fields);
    this.createForm();
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
