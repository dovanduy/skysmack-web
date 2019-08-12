import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, Field, CustomValidators } from '@skysmack/ng-dynamic-forms';
import { EmailFieldComponent, PasswordFieldComponent, CheckboxFieldComponent } from '@skysmack/portal-fields';
import { CommercialAccountLoginValidation } from './commercial-account-login-validation';

@Injectable({ providedIn: 'root' })
export class CommercialAccountLoginFieldsConfig {
    public validation = new CommercialAccountLoginValidation();
    public area = '';
    public formRules: FormRule[] = [];

    constructor() { }

    public getFields(): Field[] {
        const fields = [
            new Field({
                component: EmailFieldComponent,
                value: undefined,
                key: 'email',
                validators: [Validators.required, CustomValidators.validEmail()],
                order: 1,
                sortable: true
            }),

            new Field({
                component: PasswordFieldComponent,
                value: undefined,
                key: 'password',
                validators: [Validators.required],
                order: 2,
                sortable: true
            }),

            new Field({
                component: CheckboxFieldComponent,
                value: true,
                key: 'staySignedIn',
                order: 3,
                sortable: true
            })
        ];

        return fields;
    }
}
