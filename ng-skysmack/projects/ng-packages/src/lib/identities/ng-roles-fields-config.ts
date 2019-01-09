import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';
import { Role } from '@skysmack/packages-identities';
import { Field } from '@skysmack/ng-ui';
import { FieldTypes } from '@skysmack/ng-ui';
import { RolesValidation } from './ng-roles-validation';
import { FieldsConfig } from '@skysmack/ng-ui';

export interface NgRoleFormDependencies {
    [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgRolesFieldsConfig extends FieldsConfig<Role, NgRoleFormDependencies> {
    public validation = new RolesValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<Role, number>, dependencies?: NgRoleFormDependencies): Field[] {
        const fields = [
            new Field({
                fieldType: FieldTypes.string,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            } as Field),
        ];

        // Id field must only be added for edit forms.
        // If added to a create form, it won't be able to bind in the backend.
        if (entity && entity.object.id) {
            fields.push(new Field({
                fieldType: FieldTypes.HiddenField,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            } as Field));
        }

        return fields;
    }
}
