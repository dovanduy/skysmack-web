import { AbstractControl, ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';
import * as moment from 'moment';

/**
 * Contains static methods with custom validation rules.
 */
export class CustomValidators {

    /**
     * Compares two passwords, and set 'passwordMismatch' error on comparePasswordFieldName control.
     * Note this validator must be set for the whole form, not the single control.
     * @param passwordFieldName Name of the password field. Defaults to password.
     * @param comparePasswordFieldName Name of the field the comparing password. Error is set on this control.
     */
    public static comparePassword(passwordFieldName: string = 'password', comparePasswordFieldName: string = 'confirmPassword'): ValidatorFn {
        return (form: FormGroup): ValidationErrors | null => {
            const controls = CustomValidators.getDefaultGroupControls(form);

            const passwordControl = controls[passwordFieldName];
            const confirmPasswordControl = controls[comparePasswordFieldName];

            if (passwordControl && confirmPasswordControl) {
                if (passwordControl.value !== confirmPasswordControl.value) {
                    const error = { passwordMismatch: true };
                    confirmPasswordControl.setErrors(error);
                    return error;
                } else {
                    confirmPasswordControl.setErrors(null);
                    return null;
                }
            }
        };
    }

    /**
     * Checks if the compareDate comes before the source date. If it does, an error is added.
     * Note this validator must be set for the whole form, not the single control.
     * @param sourceDate The "start" date.
     * @param compareDate The date that must NOT come before the source date.
     */
    public static notBefore(sourceDate: string, compareDate: string): ValidatorFn {
        return (form: FormGroup): ValidationErrors | null => {
            const controls = CustomValidators.getDefaultGroupControls(form);

            const sourceDateControl = controls[sourceDate];
            const compareDateControl = controls[compareDate];

            if (sourceDateControl && compareDateControl) {
                if (moment(compareDateControl.value).isBefore(sourceDateControl.value)) {
                    const error = { notBefore: true };
                    compareDateControl.setErrors(error);
                    return error;
                } else {
                    compareDateControl.setErrors(null);
                    return null;
                }
            }
        };
    }


    /**
     * Checks if password is valid. Sets error 'invalidPassword' on invalid password.
     * Note this validator must be set for the password field, not the whole form.
     */
    public static validPassword(): ValidatorFn {
        return (passwordControl: AbstractControl): ValidationErrors | null => {
            // at least one number, one lowercase, and one uppercase letter
            // at least one special character
            // at least six characters
            const passwordCriteriaExpression = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})');
            if (!passwordCriteriaExpression.test(passwordControl.value)) {
                return { invalidPassword: true };
            } else {
                return null;
            }
        };
    }


    private static getDefaultGroupControls(form: FormGroup) {
        return ((form as FormGroup).controls['default'] as FormGroup).controls;
    }

}