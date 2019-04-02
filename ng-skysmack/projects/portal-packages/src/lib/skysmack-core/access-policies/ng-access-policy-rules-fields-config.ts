import { Injectable } from '@angular/core';
import { FormRule, SelectField } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';
import { FieldsConfig, SelectFieldComponent, HiddenFieldComponent, CheckboxFieldComponent } from '@skysmack/portal-ui';
import { AccessPolicyRule } from '@skysmack/packages-skysmack-core';
import { AccessPolicyRulesValidation } from '@skysmack/ng-packages';

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
                component: CheckboxFieldComponent,
                value: entity ? entity.object.access : false,
                key: 'access',
                order: 1,
                showColumn: true
            }),

            new SelectField({
                component: SelectFieldComponent,
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
            }),

            new Field({
                component: CheckboxFieldComponent,
                value: entity ? entity.object.includeRoles : false,
                key: 'includeRoles',
                order: 3,
                showColumn: true
            })
        ];

        if (entity && entity.object.id && entity.status !== LocalObjectStatus.CREATING) {
            fields.push(new Field({
                component: HiddenFieldComponent,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0
            }));
        }

        return fields;
    }
}
