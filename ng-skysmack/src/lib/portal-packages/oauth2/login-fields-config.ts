import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, DocumentFieldsConfig, FieldTypes, Field } from 'lib/portal-ui';
import { LoginValidation } from './login-validation';
import { LocalObject } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class LoginFieldsConfig extends DocumentFieldsConfig<any, any> {
    public validation = new LoginValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<any>, dependencies?: any): Field[] {
        const fields = [
            new Field({
                fieldType: FieldTypes.EmailField,
                value: undefined,
                key: 'email',
                validators: [Validators.required],
                order: 1,
            } as Field),

            new Field({
                fieldType: FieldTypes.PasswordField,
                value: undefined,
                key: 'password',
                validators: [Validators.required],
                order: 2,
            } as Field)
        ];

        return fields;
    }
}
