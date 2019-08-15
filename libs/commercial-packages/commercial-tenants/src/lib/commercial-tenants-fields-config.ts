import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { StringFieldComponent } from '@skysmack/portal-fields';
import { CommercialTenantsValidation } from './commercial-tenants-validation';
import { LocalObject } from '@skysmack/framework';
import { Tenant } from './models/tenant';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { LoadedPackage } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class CommercialTenantsFieldsConfig extends FieldsConfig<any, any>{
    public validation = new CommercialTenantsValidation();
    public area = '';
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders);
    }
    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<any, any>): Field[] {
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
                // validators: [Validators.required],
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
                order: 1,
                sortable: true,
                includeInForm: false
            }),
        ];

        return fields;
    }
}
