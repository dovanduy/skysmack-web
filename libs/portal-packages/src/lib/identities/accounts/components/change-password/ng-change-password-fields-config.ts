import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject } from '@skysmack/framework';

import { LoadedPackage } from '@skysmack/ng-framework';
import { ChangePassword, ACCOUNT_AREA_KEY, ACCOUNT_ADDITIONAL_PATHS } from '@skysmack/packages-identities';
import { NgChangePasswordValidation } from '@skysmack/ng-identities';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { PasswordFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgChangePasswordFieldsConfig extends FieldsConfig<ChangePassword, number> {
    public validation = new NgChangePasswordValidation();
    public area = ACCOUNT_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
    ) {
        super(fieldProviders, ACCOUNT_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<ChangePassword, number>): Field[] {
        const fields = [
            new Field({
                component: PasswordFieldComponent,
                value: entity ? entity.object.currentPassword : undefined,
                key: 'currentPassword',
                placeholder: 'ACCOUNTS.FORM.PLACEHOLDERS.CURRENTPASSWORD',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            }),

            new Field({
                component: PasswordFieldComponent,
                value: entity ? entity.object.newPassword : undefined,
                key: 'newPassword',
                placeholder: 'ACCOUNTS.FORM.PLACEHOLDERS.NEWPASSWORD',
                validators: [Validators.required],
                order: 2,
                showColumn: true,
                sortable: true
            }),

            new Field({
                component: PasswordFieldComponent,
                value: entity ? entity.object.confirmNewPassword : undefined,
                key: 'confirmNewPassword',
                placeholder: 'ACCOUNTS.FORM.PLACEHOLDERS.CONFIRMPASSWORD',
                validators: [Validators.required],
                order: 3,
                sortable: true
            })
        ];

        return fields;
    }
}
