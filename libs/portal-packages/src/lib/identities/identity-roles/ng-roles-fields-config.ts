import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Role, ROLES_AREA_KEY } from '@skysmack/packages-identities';
import { NgRolesValidation } from '@skysmack/ng-identities';
import { LoadedPackage } from '@skysmack/ng-framework';
import { StringFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';

@Injectable({ providedIn: 'root' })
export class NgRolesFieldsConfig extends FieldsConfig<Role, number> {
    public validation = new NgRolesValidation();
    public area = ROLES_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, additionalPaths: string[], entity?: LocalObject<Role, number>): Field[] {
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
