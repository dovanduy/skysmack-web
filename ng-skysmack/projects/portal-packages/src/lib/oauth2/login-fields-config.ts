import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, FieldTypes, Field, FieldsConfig } from '@skysmack/ng-ui';
import { LoginValidation } from './login-validation';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class LoginFieldsConfig extends FieldsConfig<any, any, any> {
    public validation = new LoginValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<any, any>, dependencies?: any): Field[] {
        const fields = [
            new Field({
                fieldType: FieldTypes.EmailField,
                value: undefined,
                key: 'email',
                validators: [Validators.required],
                order: 1,
            }),

            new Field({
                fieldType: FieldTypes.PasswordField,
                value: undefined,
                key: 'password',
                validators: [Validators.required],
                order: 2,
            })
        ];

        return fields;
    }
}
