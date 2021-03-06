import { AbstractControl, ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';
import * as _moment from 'moment';
const moment = _moment;


export const isEmailRegex = '.+@.+';

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
            const controls = form.controls;

            const passwordControl = controls[passwordFieldName];
            const confirmPasswordControl = controls[comparePasswordFieldName];

            if (passwordControl && confirmPasswordControl && ((passwordControl.value && passwordControl.value.length > 0) || (confirmPasswordControl.value && confirmPasswordControl.value.length > 0))) {
                if (!passwordControl.value || !confirmPasswordControl.value || passwordControl.value !== confirmPasswordControl.value) {
                    const error = { passwordMismatch: true };
                    confirmPasswordControl.setErrors(error);
                    return error;
                }
            }

            if (confirmPasswordControl) {
                confirmPasswordControl.setErrors(null);
            }
            return null;
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
            const controls = form.controls;

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
            // Only validate, if any data, otherwise required will validate
            if (passwordControl && passwordControl.value && passwordControl.value.length > 0 && !passwordCriteriaExpression.test(passwordControl.value)) {
                return { invalidPassword: true };
            } else {
                return null;
            }
        };
    }

    public static validEmail(): ValidatorFn {
        return (emailControl: AbstractControl): ValidationErrors | null => {
            const emailCriteria = new RegExp(isEmailRegex);
            if (!emailCriteria.test(emailControl.value)) {
                return { invalidEmail: true };
            } else {
                return null;
            }
        };
    }

    /**
     * Checks if a string is a min length.
     * Note this validator must be set for the password field, not the whole form.
     */
    public static minStringLength(minLength: number): ValidatorFn {
        return (stringFieldControl: AbstractControl): ValidationErrors | null => {
            if (stringFieldControl && minLength > 0 && stringFieldControl.value && stringFieldControl.value.length < minLength) {
                return { invalidStringLength: true };
            } else {
                return null;
            }
        };
    }
}
