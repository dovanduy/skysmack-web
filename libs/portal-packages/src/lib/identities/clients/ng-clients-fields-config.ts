import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { StringFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { Client, CLIENTS_AREA_KEY, CLIENTS_ADDITIONAL_PATHS } from '@skysmack/packages-identities';
import { NgClientsValidation } from '@skysmack/ng-identities';

@Injectable({ providedIn: 'root' })
export class NgClientsFieldsConfig extends FieldsConfig<Client, string> {
    public validation = new NgClientsValidation();
    public area = CLIENTS_AREA_KEY
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders
    ) {
        super(fieldProviders, CLIENTS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<Client, string>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.description : undefined,
                key: 'description',
                order: 2,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.online : undefined,
                key: 'online',
                order: 3,
                showColumn: true,
                includeInForm: false,
                sortable: true
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
