import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { SetDisplayNameRule } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';

import { StringFieldComponent, FieldsConfig } from '@skysmack/portal-ui';
import { LoadedPackage } from '@skysmack/ng-redux';
import { FieldProviders } from '@skysmack/portal-ui';
import { NgVerifyEmailValidation } from './ng-verify-email-validation';

@Injectable({ providedIn: 'root' })
export class NgVerifyEmailFieldsConfig extends FieldsConfig<string, unknown> {
    public validation = new NgVerifyEmailValidation();

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
            })
        ];

        return fields;
    }
}
