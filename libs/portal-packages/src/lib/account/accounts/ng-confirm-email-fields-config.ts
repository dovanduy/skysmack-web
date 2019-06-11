import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';

import { FieldsConfig, EmailFieldComponent, StringFieldComponent } from '@skysmack/portal-ui';
import { FieldProviders } from '@skysmack/portal-ui';
import { LoadedPackage } from '@skysmack/ng-framework';
import { ACCOUNTS_AREA_KEY, ConfirmEmail } from '@skysmack/packages-account';
import { NgConfirmEmailValidation } from '@skysmack/ng-packages';

@Injectable({ providedIn: 'root' })
export class NgConfirmEmailFieldsConfig extends FieldsConfig<ConfirmEmail, number> {
    public validation = new NgConfirmEmailValidation();
    public area = ACCOUNTS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
    ) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<ConfirmEmail, number>): Field[] {
        const fields = [
            new Field({
                component: EmailFieldComponent,
                value: entity ? entity.object.email : undefined,
                key: 'email',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),

            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.token : undefined,
                key: 'token',
                validators: [Validators.required],
                order: 2,
                showColumn: true
            })
        ];

        return fields;
    }
}
