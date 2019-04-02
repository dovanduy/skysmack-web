import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, Field } from '@skysmack/ng-ui';
import { LoginValidation } from './login-validation';
import { LocalObject } from '@skysmack/framework';
import { FieldsConfig, PasswordFieldComponent, EmailFieldComponent } from '@skysmack/portal-ui';

@Injectable({ providedIn: 'root' })
export class LoginFieldsConfig extends FieldsConfig<any, any, any> {
    public validation = new LoginValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<any, any>, dependencies?: any): Field[] {
        const fields = [
            new Field({
                component: EmailFieldComponent,
                value: undefined,
                key: 'email',
                validators: [Validators.required],
                order: 1,
            }),

            new Field({
                component: PasswordFieldComponent,
                value: undefined,
                key: 'password',
                validators: [Validators.required],
                order: 2,
            })
        ];

        return fields;
    }
}
