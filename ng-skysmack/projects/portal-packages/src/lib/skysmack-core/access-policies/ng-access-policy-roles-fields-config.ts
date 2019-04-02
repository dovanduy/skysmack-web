import { Injectable } from '@angular/core';
import { FormRule, SelectField } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';
import { FieldTypes } from '@skysmack/ng-ui';
import { FieldsConfig } from '@skysmack/ng-ui';
import { AccessPolicyRole, AccessPolicyRule, AccessPolicyRoleKey } from '@skysmack/packages-skysmack-core';
import { Validators } from '@angular/forms';
import { Role } from '@skysmack/packages-identities';
import { SelectFieldOption } from '@skysmack/ng-ui';
import { AccessPolicyRolesValidation } from '@skysmack/ng-packages';

export interface NgAccessPolicyRoleFormDependencies {
    availableAccessPolicyRules: LocalObject<AccessPolicyRule, number>[];
    availableRoles: LocalObject<Role, number>[];
}

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesFieldsConfig extends FieldsConfig<AccessPolicyRole, AccessPolicyRoleKey, NgAccessPolicyRoleFormDependencies> {
    public validation = new AccessPolicyRolesValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<AccessPolicyRole, AccessPolicyRoleKey>, dependencies?: NgAccessPolicyRoleFormDependencies): Field[] {

        const modifyDisplayName = (options: SelectFieldOption[]) => {
            const accessPolicyRules = dependencies && dependencies.availableAccessPolicyRules;
            return options.map(option => {
                if (accessPolicyRules) {
                    const matchingRule = accessPolicyRules.find(rule => rule.object.id === option.value);

                    let authenticated;
                    if (matchingRule.object.authenticated === true) {
                        authenticated = 'authenticated';
                    } else if (matchingRule.object.authenticated === false) {
                        authenticated = 'anonymous';
                    } else {
                        authenticated = 'both';
                    }

                    option.displayName = `${matchingRule.object.access ? 'Grant' : 'Deny'} ${authenticated}`;
                }
                return option;
            });
        };

        const fields: Field[] = [
            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity ? entity.object.id.ruleId : undefined,
                key: 'ruleId',
                optionsData: dependencies && dependencies.availableAccessPolicyRules,
                validators: [Validators.required],
                displayNameSelector: 'object.id',
                modifyDisplayName,
                order: 2,
                showColumn: true
            }),

            new SelectField({
                fieldType: FieldTypes.RolesSelectField,
                value: entity ? entity.object.id.roleId : undefined,
                key: 'roleId',
                validators: [Validators.required],
                order: 2,
                showColumn: true
            })
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
