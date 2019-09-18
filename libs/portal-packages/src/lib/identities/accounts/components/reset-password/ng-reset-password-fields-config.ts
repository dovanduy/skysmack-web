import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import { FormRule, Field, CustomValidators } from '@skysmack/ng-dynamic-forms';
import { StringFieldComponent, PasswordFieldComponent, EmailFieldComponent } from '@skysmack/portal-fields';
import { NgResetPasswordValidation } from './ng-reset-password-validation';
import { ACCOUNTS_AREA_KEY } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgResetPasswordFieldsConfig {
    public validation = new NgResetPasswordValidation();
    public area = ACCOUNTS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor() { }

    public getFields(email = undefined, token = undefined): Field[] {
        const fields = [
            new Field({
                component: EmailFieldComponent,
                value: email,
                key: 'email',
                placeholder: 'ACCOUNT.FORM.PLACEHOLDERS.EMAIL',
                validators: [Validators.required, CustomValidators.validEmail()],
                order: 1,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: token,
                key: 'token',
                placeholder: 'ACCOUNT.FORM.PLACEHOLDERS.TOKEN',
                order: 1,
                validators: [Validators.required],
                sortable: true
            }),
            new Field({
                component: PasswordFieldComponent,
                value: undefined,
                key: 'newPassword',
                placeholder: 'ACCOUNT.FORM.PLACEHOLDERS.NEWPASSWORD',
                validators: [Validators.required, CustomValidators.validPassword()],
                order: 2,
                sortable: true
            }),

            new Field({
                component: PasswordFieldComponent,
                value: undefined,
                key: 'confirmNewPassword',
                placeholder: 'ACCOUNT.FORM.PLACEHOLDERS.CONFIRMNEWPASSWORD',
                validators: [Validators.required],
                order: 3,
                sortable: true
            })
        ];

        return fields;
    }
}
