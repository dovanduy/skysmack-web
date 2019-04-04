import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Role } from '@skysmack/packages-identities';
import { Field, FormRule } from '@skysmack/ng-ui';
import { NgRolesValidation, LoadedPackage } from '@skysmack/ng-packages';
import { FieldsConfig, StringFieldComponent, HiddenFieldComponent } from '@skysmack/portal-ui';

export interface NgRoleFormDependencies {
    [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgRolesFieldsConfig extends FieldsConfig<Role, number, NgRoleFormDependencies> {
    public validation = new NgRolesValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<Role, number>, dependencies?: NgRoleFormDependencies, loadedPackage?: LoadedPackage): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 1,
                showColumn: true
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
