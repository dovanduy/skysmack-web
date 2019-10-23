import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject } from '@skysmack/framework';

import { LoadedPackage } from '@skysmack/ng-framework';
import { NgForgotPasswordValidation } from './ng-forgot-password-validation';
import { ACCOUNT_AREA_KEY, ACCOUNT_ADDITIONAL_PATHS } from '@skysmack/packages-identities';
import { FormRule, Field, CustomValidators } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { EmailFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgForgotPasswordFieldsConfig extends FieldsConfig<string, unknown> {
    public validation = new NgForgotPasswordValidation();
    public area = ACCOUNT_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders
    ) {
        super(fieldProviders, ACCOUNT_ADDITIONAL_PATHS);
    }


    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<string, unknown>): Field[] {
        const fields = [
            new Field({
                component: EmailFieldComponent,
                value: entity ? entity.object : undefined,
                key: 'email',
                validators: [Validators.required, CustomValidators.validEmail()],
                sortable: true
            })
        ];

        return fields;
    }
}