import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, CustomValidators } from '@skysmack/ng-ui';
import { SetDisplayNameRule } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';

import { FieldsConfig, EmailFieldComponent } from '@skysmack/portal-ui';
import { LoadedPackage } from '@skysmack/ng-packages';
import { FieldProviders } from '@skysmack/portal-ui';
import { NgForgotPasswordValidation } from './ng-forgot-password-validation';

@Injectable({ providedIn: 'root' })
export class NgForgotPasswordFieldsConfig extends FieldsConfig<string, unknown> {
    public validation = new NgForgotPasswordValidation();

    public formRules: FormRule[] = [
        new SetDisplayNameRule(['firstName', 'lastName'])
    ];

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
