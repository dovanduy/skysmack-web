import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject } from '@skysmack/framework';

import { LoadedPackage } from '@skysmack/ng-framework';
import { ACCOUNT_AREA_KEY, ConfirmEmail, ACCOUNT_ADDITIONAL_PATHS } from '@skysmack/packages-identities';
import { NgConfirmEmailValidation } from '@skysmack/ng-identities';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { EmailFieldComponent, StringFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgConfirmEmailFieldsConfig extends FieldsConfig<ConfirmEmail, number> {
    public validation = new NgConfirmEmailValidation();
    public area = ACCOUNT_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
    ) {
        super(fieldProviders, ACCOUNT_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<ConfirmEmail, number>): Field[] {
        const fields = [
            new Field({
                component: EmailFieldComponent,
                value: entity ? entity.object.email : undefined,
                key: 'email',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            }),

            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.token : undefined,
                key: 'token',
                validators: [Validators.required],
                order: 2,
                showColumn: true,
                sortable: true
            })
        ];

        return fields;
    }
}
