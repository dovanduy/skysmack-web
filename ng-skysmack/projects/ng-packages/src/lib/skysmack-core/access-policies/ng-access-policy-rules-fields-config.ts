import { Injectable } from '@angular/core';
import { FormRule, SelectField } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';
import { FieldTypes } from '@skysmack/ng-ui';
import { FieldsConfig } from '@skysmack/ng-ui';
import { AccessPolicyRulesValidation } from './ng-access-policy-rules-validation';
import { AccessPolicyRule } from '@skysmack/packages-skysmack-core';

export interface NgAccessPolicyRuleFormDependencies {
    [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRulesFieldsConfig extends FieldsConfig<AccessPolicyRule, number, NgAccessPolicyRuleFormDependencies> {
    public validation = new AccessPolicyRulesValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<AccessPolicyRule, number>, dependencies?: NgAccessPolicyRuleFormDependencies): Field[] {
        const fields = [
            new Field({
                fieldType: FieldTypes.CheckboxField,
                value: entity ? entity.object.access : false,
                key: 'access',
                order: 1,
                showColumn: true
            } as Field),

            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity ? entity.object.authenticated : undefined,
                key: 'authenticated',
                extraOptions: [
                    {
                        value: null,
                        displayName: 'Both'
                    },
                    {
                        value: true,
                        displayName: 'Authenticated'
                    },
                    {
                        value: false,
                        displayName: 'Anonymous'
                    }
                ],
                order: 2,
                showColumn: true
            } as SelectField),

            new Field({
                fieldType: FieldTypes.CheckboxField,
                value: entity ? entity.object.includeRoles : false,
                key: 'includeRoles',
                order: 3,
                showColumn: true
            } as Field)
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
