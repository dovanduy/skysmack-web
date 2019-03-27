import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { FieldsConfig, Field, FormRule, CustomValidators, FieldTypes } from '@skysmack/ng-ui';
import { NgSetPasswordValidation } from './ng-set-password-validation';
import { User } from '@skysmack/packages-identities';

export interface NgSetPasswordFormDependencies {
    [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgSetPasswordFieldsConfig extends FieldsConfig<User, number, NgSetPasswordFormDependencies> {
    public validation = new NgSetPasswordValidation();
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
            }),

            new Field({
                fieldType: FieldTypes.PasswordField,
                value: undefined,
                key: 'confirmPassword',
                label: 'Confirm password',
                validators: [Validators.required],
                order: 3,
                placeholder: 'Password',
            })
        ];

        return fields;
    }
}
