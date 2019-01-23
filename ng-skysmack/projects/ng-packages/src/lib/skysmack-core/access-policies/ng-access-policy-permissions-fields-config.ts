import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, SelectField, SelectFieldOption } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';
import { FieldTypes } from '@skysmack/ng-ui';
import { FieldsConfig } from '@skysmack/ng-ui';
import { AccessPolicyPermissionsValidation } from './ng-acess-policy-permissions-validation';
import { AccessPolicyPermission } from '@skysmack/packages-skysmack-core';

export interface NgAccessPolicyPermissionFormDependencies {
    [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyPermissionsFieldsConfig extends FieldsConfig<AccessPolicyPermission, NgAccessPolicyPermissionFormDependencies> {
    public validation = new AccessPolicyPermissionsValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<AccessPolicyPermission, number>, dependencies?: NgAccessPolicyPermissionFormDependencies): Field[] {
        const fields = [
            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity ? entity.object.packagePath : undefined,
                key: 'packagePath',
                optionsData: dependencies.availablePackages,
                extraOptions: [{
                    value: null,
                    displayName: 'None'
                }] as SelectFieldOption[],
                valueSelector: 'packagePath',
                order: 2,
            } as SelectField),

            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity ? entity.object.ruleId : undefined,
                key: 'ruleId',
                optionsData: dependencies.availableAccessPolicyRules,
                displayNameSelector: 'object.id',
                order: 2,
            } as SelectField),

            new Field({
                fieldType: FieldTypes.string,
                value: entity ? entity.object.permission : undefined,
                key: 'permission',
                order: 3,
            } as Field),

            new Field({
                fieldType: FieldTypes.int,
                value: entity ? entity.object.order : false,
                key: 'order',
                validators: [Validators.required],
                order: 4,
            } as Field),

            new Field({
                fieldType: FieldTypes.CheckboxField,
                value: entity ? entity.object.isTopLevel : false,
                key: 'isTopLevel',
                validators: [Validators.required],
                order: 4,
            } as Field),
        ];

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
