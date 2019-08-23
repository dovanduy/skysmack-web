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
    public area = 'COMMERCIAL_ACCOUNT';
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
                value: entity ? entity.object.currentPassword : undefined,
                key: 'currentPassword',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),

            new Field({
                component: PasswordFieldComponent,
                value: entity ? entity.object.newPassword : undefined,
                key: 'newPassword',
                validators: [Validators.required],
                order: 2,
                showColumn: true
            }),

            new Field({
                component: PasswordFieldComponent,
                value: entity ? entity.object.confirmNewPassword : undefined,
                key: 'confirmNewPassword',
                validators: [Validators.required],
                order: 3
            })
        ];

        return fields;
    }
}
