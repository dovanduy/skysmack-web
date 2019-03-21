import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, SelectField, SelectFieldOption } from '@skysmack/ng-ui';
import { LocalObject, Package, LocalObjectStatus } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';
import { FieldTypes } from '@skysmack/ng-ui';
import { FieldsConfig } from '@skysmack/ng-ui';
import { AccessPolicyPermissionsValidation } from './ng-access-policy-permissions-validation';
import { AccessPolicyPermission, AccessPolicyRule } from '@skysmack/packages-skysmack-core';

export interface NgAccessPolicyPermissionFormDependencies {
    installedPackages: LocalObject<Package, string>[];
    availableAccessPolicyRules: LocalObject<AccessPolicyRule, number>[];
}

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyPermissionsFieldsConfig extends FieldsConfig<AccessPolicyPermission, number, NgAccessPolicyPermissionFormDependencies> {
    public validation = new AccessPolicyPermissionsValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<AccessPolicyPermission, number>, dependencies?: NgAccessPolicyPermissionFormDependencies): Field[] {
        const fields = [
            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity ? entity.object.packagePath : undefined,
                key: 'packagePath',
                optionsData: dependencies && dependencies.installedPackages,
                extraOptions: [{
                    value: null,
                    displayName: 'None'
                }] as SelectFieldOption[],
                valueSelector: 'object.path',
                order: 2,
                showColumn: true
            }),

            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity ? entity.object.ruleId : undefined,
                key: 'ruleId',
                optionsData: dependencies && dependencies.availableAccessPolicyRules,
                displayNameSelector: 'object.id',
                order: 2,
                showColumn: true
            }),

            new Field({
                fieldType: FieldTypes.AvailablePermissionsField,
                value: entity ? entity.object.permission : undefined,
                key: 'permission',
                order: 3,
                showColumn: true
            }),

            new Field({
                fieldType: FieldTypes.int,
                value: entity ? entity.object.order : false,
                key: 'order',
                validators: [Validators.required],
                order: 4,
                showColumn: true
            }),

            new Field({
                fieldType: FieldTypes.CheckboxField,
                value: entity ? entity.object.isTopLevel : false,
                key: 'isTopLevel',
                validators: [Validators.required],
                order: 4,
                showColumn: true
            }),
        ];

        if (entity && entity.object.id && entity.status !== LocalObjectStatus.CREATING) {
            fields.push(new Field({
                fieldType: FieldTypes.HiddenField,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0
            }));
        }

        return fields;
    }
}
