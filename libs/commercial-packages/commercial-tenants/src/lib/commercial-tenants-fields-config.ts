import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, Field, CustomValidators, SetPathRule, SelectField, SelectFieldOption } from '@skysmack/ng-dynamic-forms';
import { StringFieldComponent, HiddenFieldComponent, SelectFieldComponent } from '@skysmack/portal-fields';
import { CommercialTenantsValidation } from './commercial-tenants-validation';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { LoadedPackage } from '@skysmack/ng-framework';
import { SubDomainFieldComponent } from './components/sub-domain-field/sub-domain-field.component';
import { MultipleUsersFieldComponent } from './components/multiple-users-field/multiple-users-field.component';
import { InstallTenant } from './models/install-tenant';
import { JSONFieldComponent } from './components/json-field/json-field.component';

@Injectable({ providedIn: 'root' })
export class CommercialTenantsFieldsConfig extends FieldsConfig<InstallTenant, string>{
    public validation = new CommercialTenantsValidation();
    public area = '';
    public formRules: FormRule[] = [
        new SetPathRule('name', 'safeSubdomain')
    ];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, []);
    }
    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<InstallTenant, string>): Field[] {
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
                component: SubDomainFieldComponent,
                value: entity ? entity.object.safeSubdomain : undefined,
                key: 'safeSubdomain',
                validators: [Validators.required, CustomValidators.minStringLength(4)],
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

            new Field({
                component: MultipleUsersFieldComponent,
                value: entity ? entity.object.owners : undefined,
                key: 'owners',
                order: 1,
                sortable: true,
                includeInForm: true
            }),

            new Field({
                component: JSONFieldComponent,
                value: entity ? entity.object.packages : undefined,
                key: 'packages',
                order: 1,
                sortable: true,
                includeInForm: true
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
            })
            );
        }

        if (entity && entity.object.state != 0) {
            fields.push(
                new SelectField({
                    component: SelectFieldComponent,
                    value: entity ? entity.object.state : undefined,
                    key: 'state',
                    extraOptions: [{ displayName: 'Running', value: 1 }, { displayName: 'Stopped', value: 2 }, { displayName: 'Deleted', value: 3 }],
                    validators: [Validators.required],
                    order: 3,
                    sortable: true
                }));
        }

        return fields;
    }
}