import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject } from '@skysmack/framework';

import { LoadedPackage } from '@skysmack/ng-framework';
import { ChangePassword, ACCOUNTS_AREA_KEY } from '@skysmack/packages-identities';
import { NgChangePasswordValidation } from '@skysmack/ng-identities';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { PasswordFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgChangePasswordFieldsConfig extends FieldsConfig<ChangePassword, number> {
    public validation = new NgChangePasswordValidation();
    public area = ACCOUNTS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
    ) {
        super(fieldProviders);
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
