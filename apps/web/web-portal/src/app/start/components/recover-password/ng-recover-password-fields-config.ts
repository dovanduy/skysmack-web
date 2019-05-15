import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, CustomValidators } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';

import { FieldsConfig, PasswordFieldComponent, StringFieldComponent, } from '@skysmack/portal-ui';
import { LoadedPackage } from '@skysmack/ng-redux';
import { FieldProviders } from '@skysmack/portal-ui';
import { NgRecoverPasswordValidation } from './ng-recover-password-validation';
import { OAUTH2_AREA_KEY } from '@skysmack/packages-oauth2';

@Injectable({ providedIn: 'root' })
export class NgRecoverPasswordFieldsConfig extends FieldsConfig<string, unknown> {
    public validation = new NgRecoverPasswordValidation();
    public area = OAUTH2_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders
    ) {
        super(fieldProviders);
    }


    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<string, unknown>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object : undefined,
                key: 'token',
                validators: [Validators.required],
            }),
            new Field({
                component: PasswordFieldComponent,
                value: undefined,
                key: 'password',
                label: 'Password',
                validators: [Validators.required, CustomValidators.validPassword()],
                order: 2,
                placeholder: 'Password',
            }),

            new Field({
                component: PasswordFieldComponent,
                value: undefined,
                key: 'confirmPassword',
                label: 'Confirm password',
                validators: [Validators.required],
                order: 3,
                placeholder: 'Password',
            })
        ];

        return fields;
    }
}
