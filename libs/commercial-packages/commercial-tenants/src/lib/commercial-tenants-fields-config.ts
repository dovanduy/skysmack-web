import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { StringFieldComponent } from '@skysmack/portal-fields';
import { CommercialTenantsValidation } from './commercial-tenants-validation';
import { LocalObject } from '@skysmack/framework';
import { Tenant } from './models/tenant';

@Injectable({ providedIn: 'root' })
export class CommercialTenantsFieldsConfig {
    public validation = new CommercialTenantsValidation();
    public area = '';
    public formRules: FormRule[] = [];

    constructor() { }

    public getFields(entity?: LocalObject<Tenant, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 1,
                sortable: true
            }),

            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.hostname : undefined,
                key: 'hostname',
                validators: [Validators.required],
                order: 1,
                sortable: true
            }),

            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.safeSubdomain : undefined,
                key: 'safeSubdomain',
                validators: [Validators.required],
                order: 1,
                sortable: true
            }),

            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.state : undefined,
                key: 'state',
                validators: [Validators.required],
                order: 1,
                sortable: true
            }),
        ];

        return fields;
    }
}
