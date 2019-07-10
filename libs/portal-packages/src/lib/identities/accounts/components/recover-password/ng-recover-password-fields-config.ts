import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject } from '@skysmack/framework';

import { LoadedPackage } from '@skysmack/ng-framework';
import { NgRecoverPasswordValidation } from './ng-recover-password-validation';
import { OAUTH2_AREA_KEY } from '@skysmack/packages-oauth2';
import { FormRule, Field, CustomValidators } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { StringFieldComponent, PasswordFieldComponent } from '@skysmack/portal-fields';

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
