import { Injectable } from '@angular/core';
import { LocalObject } from '@skysmack/framework';

import { LoadedPackage } from '@skysmack/ng-framework';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { DateTimeFieldComponent } from '@skysmack/portal-fields';
import { FieldProviders, FieldsConfig } from '@skysmack/ng-fields';
import { NgFromToValidation } from './ng-from-to-validation';

@Injectable({ providedIn: 'root' })
export class NgFromToFieldsConfig extends FieldsConfig<unknown, unknown> {
    public validation = new NgFromToValidation();
    public area = 'MAINTENANCE';
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
    ) {
        super(fieldProviders, []);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<unknown, unknown>): Field[] {
        const fields = [
            new Field({
                component: DateTimeFieldComponent,
                value: undefined,
                key: 'from',
                validators: [],
                order: 1
            }),

            new Field({
                component: DateTimeFieldComponent,
                value: undefined,
                key: 'to',
                validators: [],
                order: 2
            })
        ];

        return fields;
    }
}
