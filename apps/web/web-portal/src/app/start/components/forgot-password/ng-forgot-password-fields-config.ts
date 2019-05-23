import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, CustomValidators } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';
import { OAUTH2_AREA_KEY } from '@skysmack/packages-oauth2';

import { FieldsConfig, EmailFieldComponent } from '@skysmack/portal-ui';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FieldProviders } from '@skysmack/portal-ui';
import { NgForgotPasswordValidation } from './ng-forgot-password-validation';

@Injectable({ providedIn: 'root' })
export class NgForgotPasswordFieldsConfig extends FieldsConfig<string, unknown> {
    public validation = new NgForgotPasswordValidation();
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
                component: EmailFieldComponent,
                value: entity ? entity.object : undefined,
                key: 'email',
                validators: [Validators.required, CustomValidators.validEmail()],
            })
        ];

        return fields;
    }
}