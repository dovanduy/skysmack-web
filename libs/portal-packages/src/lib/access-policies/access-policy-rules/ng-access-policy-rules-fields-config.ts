import { Injectable } from '@angular/core';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { AccessPolicyRule, ACCESS_POLICY_RULES_AREA_KEY, ACCESS_POLICY_RULES_ADDITIONAL_PATHS } from '@skysmack/packages-skysmack-core';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { FieldProviders, FieldsConfig } from '@skysmack/ng-fields';
import { CheckboxFieldComponent, SelectFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { AccessPolicyRulesValidation } from '@skysmack/ng-access-policies';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRulesFieldsConfig extends FieldsConfig<AccessPolicyRule, number> {
    public validation = new AccessPolicyRulesValidation();
    public area = ACCESS_POLICY_RULES_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders
    ) {
        super(fieldProviders, ACCESS_POLICY_RULES_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<AccessPolicyRule, number>): Field[] {
        const fields = [
            new Field({
                component: CheckboxFieldComponent,
                value: entity ? entity.object.access : false,
                key: 'access',
                order: 1,
                showColumn: true,
                sortable: true
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
                showColumn: true,
                sortable: true
            }),

            new Field({
                component: CheckboxFieldComponent,
                value: entity ? entity.object.includeRoles : false,
                key: 'includeRoles',
                order: 3,
                showColumn: true,
                sortable: true
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
