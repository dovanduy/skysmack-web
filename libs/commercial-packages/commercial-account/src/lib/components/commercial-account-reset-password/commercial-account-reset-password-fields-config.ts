import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, Field, CustomValidators } from '@skysmack/ng-dynamic-forms';
import { EmailFieldComponent, StringFieldComponent, PasswordFieldComponent } from '@skysmack/portal-fields';
import { CommercialAccountResetPasswordValidation } from './commercial-account-reset-password-validation';
import { ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CommercialAccountResetPasswordFieldsConfig {
    public validation = new CommercialAccountResetPasswordValidation();
    public area = '';
    public formRules: FormRule[] = [];

    constructor(private route: ActivatedRoute) { }

    public getFields(email = undefined, token = undefined): Field[] {
        const fields = [
            new Field({
                component: EmailFieldComponent,
                value: email,
                key: 'email',
                validators: [Validators.required, CustomValidators.validEmail()],
                order: 1,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: token,
                key: 'token',
                validators: [Validators.required],
                order: 2,
                sortable: true
            }),
            new Field({
                component: PasswordFieldComponent,
                value: undefined,
                key: 'newPassword',
                validators: [Validators.required],
                order: 3,
                sortable: true
            }),
            new Field({
                component: PasswordFieldComponent,
                value: undefined,
                key: 'confirmNewPassword',
                validators: [Validators.required],
                order: 4,
                sortable: true
            })
        ];

        return fields;
    }
}
