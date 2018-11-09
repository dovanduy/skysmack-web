import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import { Field, FormHelper, FormRule, EntityValidation } from 'framework';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'ss-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnDestroy {

  @Input() public fields: Field[];
  @Input() public rules: FormRule[];
  @Input() public validation: EntityValidation;
  @Input() public buttonText = 'Submit';

  public production = environment.production;
  public fh: FormHelper;

  public subscription: SubscriptionLike;

  @Output() public submitted: EventEmitter<FormHelper> = new EventEmitter();

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
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
    const groupedFields = this.groupFields(this.fields);
    Object.keys(groupedFields).map(key => formGroup[key] = this.fb.group(groupedFields[key]));
    const formHelper = new FormHelper(this.fb.group(formGroup, { validator: this.validation.formValidators }), this.validation);
    return formHelper;
  }

  /**
   * Creates an array with field group arrays. Each group conaints field set to that group.
   */
  private groupFields(fields: Field[]) {
    // Array to contain each type of field group we have.
    const groupedFields = [];
    fields.forEach(field => {
      // Create the field group property and instantiate its array if it does not exist
      if (!groupedFields[field.groupName]) {
        groupedFields[field.groupName] = [];
      }
      // Add the field to its group
      groupedFields[field.groupName][field.key] = field.validators ? [field.value, Validators.compose(field.validators)] : field.value;
    });

    return groupedFields;
  }

  /**
   * Disable fields set to be disabled
   */
  private disableFields(fields: Field[], formHelper: FormHelper) {
    fields.filter(field => field.disabled === true).forEach(field => {
      Object.keys(formHelper.form.controls).forEach(fieldGroup => {
        const control = (formHelper.form.controls[fieldGroup] as FormGroup).controls[field.key];
        if (control) {
          control.disable();
        }
      });
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
