import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject } from '@skysmack/framework';
import { LoadedPackage } from '@skysmack/ng-framework';
import { ChangePassword } from '@skysmack/packages-identities';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { PasswordFieldComponent } from '@skysmack/portal-fields';
import { CommercialAccountChangePasswordValidation } from './commercial-account-change-password-validation';

@Injectable({ providedIn: 'root' })
export class CommercialAccountChangePasswordFieldsConfig extends FieldsConfig<ChangePassword, number> {
    public validation = new CommercialAccountChangePasswordValidation();
    public area = '';
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
    ) {
        super(fieldProviders, []);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<ChangePassword, number>): Field[] {
        const fields = [
            new Field({
                component: PasswordFieldComponent,
                value: undefined,
                key: 'currentPassword',
                placeholder: 'COMMERCIAL_ACCOUNT.FORM.PLACEHOLDERS.CURRENTPASSWORD',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),

            new Field({
                component: PasswordFieldComponent,
                value: undefined,
                key: 'newPassword',
                placeholder: 'COMMERCIAL_ACCOUNT.FORM.PLACEHOLDERS.NEWPASSWORD',
                validators: [Validators.required],
                order: 2,
                showColumn: true
            }),

            new Field({
                component: PasswordFieldComponent,
                value: undefined,
                key: 'confirmNewPassword',
                placeholder: 'COMMERCIAL_ACCOUNT.FORM.PLACEHOLDERS.CONFIRMNEWPASSWORD',
                validators: [Validators.required],
                order: 3
            })
        ];

        return fields;
    }
}
