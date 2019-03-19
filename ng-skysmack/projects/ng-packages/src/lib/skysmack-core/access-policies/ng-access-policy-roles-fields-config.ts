import { Injectable } from '@angular/core';
import { FormRule, SelectField } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';
import { FieldTypes } from '@skysmack/ng-ui';
import { FieldsConfig } from '@skysmack/ng-ui';
import { AccessPolicyRolesValidation } from './ng-access-policy-roles-validation';
import { AccessPolicyRole, AccessPolicyRule, AccessPolicyRoleKey } from '@skysmack/packages-skysmack-core';
import { Validators } from '@angular/forms';
import { Role } from '@skysmack/packages-identities';

export interface NgAccessPolicyRoleFormDependencies {
    availableAccessPolicyRules: LocalObject<AccessPolicyRule, number>[];
    availableRoles: LocalObject<Role, number>[];
}

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesFieldsConfig extends FieldsConfig<AccessPolicyRole, AccessPolicyRoleKey, NgAccessPolicyRoleFormDependencies> {
    public validation = new AccessPolicyRolesValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<AccessPolicyRole, AccessPolicyRoleKey>, dependencies?: NgAccessPolicyRoleFormDependencies): Field[] {
        const fields: Field[] = [
            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity ? entity.object.id.ruleId : undefined,
                key: 'ruleId',
                optionsData: dependencies && dependencies.availableAccessPolicyRules,
                validators: [Validators.required],
                displayNameSelector: 'object.id',
                order: 2,
                showColumn: true
            } as SelectField),

            new SelectField({
                fieldType: FieldTypes.RolesSelectField,
                value: entity ? entity.object.id.roleId : undefined,
                key: 'roleId',
                validators: [Validators.required],
                order: 2,
                showColumn: true
            } as SelectField)
        ];

        if (entity && entity.object.id && entity.status !== LocalObjectStatus.CREATING) {
            fields.push(new Field({
                fieldType: FieldTypes.HiddenField,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0
            } as Field));
        }

        return fields;
    }
}
