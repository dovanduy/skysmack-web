import { FormControl, FormGroup } from '@angular/forms';
import { RecordValidation } from './record-validation';

export class FormHelper {

    public formSubmitted = false;
    public formErrors: any;
    public messages: any;

    /**
     * Prevents formErrors being added again after form is valid and posted (caused by some custom validations).
    */
    public autoReset = false;

    constructor(
        public form: FormGroup,
        public validation: RecordValidation
    ) {
        this.formErrors = validation.formErrors;
    }

    /**
     * Add error messages to the formError property.
     * @param control The control containing errors.
     * @param field  The field you want error messages for. Ex.: firstName.
     */
    public addErrors(control: FormControl, field: string) {
        this.messages = this.validation.validationMessages[field];

        if (control.errors && !this.autoReset) {
            Object.keys(control.errors).forEach(key => {
                this.formErrors[field] = this.messages[key];
            });
        }
    }

    /**
     * Runs the form helpers validation logic against the submitted form. Runs the supplied logic on success.
     * @param onValidated What to do if the form validates.
     */
    public formValid(onValidated: Function, autoReset: boolean = true) {
        this.formSubmitted = true;
        if (!this.form.valid) {
            this.validateForm(this.form);
        } else {
            this.formSubmitted = false;
            onValidated();
            if (autoReset) {
                (this.form as FormGroup).reset();
                this.autoReset = autoReset;
            }
        }
    }

    /**
     * Validates all fields on the form. Works when a single control changes or the form is submitted.
     * @param form The form to perfom validation on.
     */
    public validateForm(form: FormGroup) {
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);

            // Reset error field message. Otherwise they'll stack.
            this.formErrors[field] = '';

            // The control is a form field.
            if (control instanceof FormControl) {
                // The form has not been submitted. Only add errors to fields the user have changed (dirtied).
                if (!this.formSubmitted) {
                    if (control.dirty) {
                        this.addErrors(control, field);
                    }
                }

                // The form has been submitted. Add errors to all fields that are not valid.
                if (this.formSubmitted) {
                    if (!control.valid) {
                        this.addErrors(control, field);
                        control.markAsTouched();
                    }
                }
            } else if (control instanceof FormGroup) { // The control is a nested form group.
                this.validateForm(control);
            }
        });
    }
}
