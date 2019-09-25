import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { StringFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { CommercialTenantsValidation } from './commercial-tenants-validation';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { LoadedPackage } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class CommercialTenantsFieldsConfig extends FieldsConfig<any, any>{
    public validation = new CommercialTenantsValidation();
    public area = '';
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, []);
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
                order: 1,
                sortable: true,
                includeInForm: false
            })
        ];

        // Id field must only be added for edit forms.
        // If added to a create form, it won't be able to bind in the backend.
        if (entity && entity.object.id && entity.status !== LocalObjectStatus.CREATING) {
            fields.push(new Field({
                component: HiddenFieldComponent,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            }));
        }

        return fields;
    }
}
