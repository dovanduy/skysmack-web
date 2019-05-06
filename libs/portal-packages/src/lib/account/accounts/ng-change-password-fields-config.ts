import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { SetDisplayNameRule } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Person } from '@skysmack/packages-persons';
import { Field } from '@skysmack/ng-ui';

import { PasswordFieldComponent, FieldsConfig } from '@skysmack/portal-ui';
import { FieldProviders } from '@skysmack/portal-ui';
import { LoadedPackage } from '@skysmack/ng-redux';
import { ChangePassword } from '@skysmack/packages-account';
import { NgChangePasswordValidation } from '@skysmack/ng-packages';

@Injectable({ providedIn: 'root' })
export class NgChangePasswordFieldsConfig extends FieldsConfig<ChangePassword, number> {
    public validation = new NgChangePasswordValidation();

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