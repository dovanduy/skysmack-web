import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, CustomValidators } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';
import { FieldTypes } from '@skysmack/ng-ui';
import { SetPasswordValidation } from './ng-set-password-validation';
import { FieldsConfig } from '@skysmack/ng-ui';
import { User } from '@skysmack/packages-identities';

export interface NgSetPasswordFormDependencies {
    [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgSetPasswordFieldsConfig extends FieldsConfig<User, NgSetPasswordFormDependencies> {
    public validation = new SetPasswordValidation();
    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<User, number>, dependencies?: NgSetPasswordFormDependencies): Field[] {
        const fields = [
            new Field({
                fieldType: FieldTypes.PasswordField,
                value: undefined,
                key: 'password',
                label: 'Password',
                validators: [Validators.required, CustomValidators.validPassword()],
                order: 2,
                placeholder: 'Password',
            } as Field),

            new Field({
                fieldType: FieldTypes.PasswordField,
                value: undefined,
                key: 'confirmPassword',
                label: 'Confirm password',
                validators: [Validators.required],
                order: 3,
                placeholder: 'Password',
            } as Field)
        ];

        return fields;
    }
}
