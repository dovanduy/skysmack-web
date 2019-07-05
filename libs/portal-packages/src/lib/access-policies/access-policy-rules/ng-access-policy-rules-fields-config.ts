import { Injectable } from '@angular/core';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { FieldsConfig, SelectFieldComponent, HiddenFieldComponent, CheckboxFieldComponent } from '@skysmack/portal-ui';
import { AccessPolicyRule, ACCESS_POLICY_RULES_AREA_KEY } from '@skysmack/packages-skysmack-core';
import { AccessPolicyRulesValidation } from '@skysmack/ng-packages';
import { FieldProviders } from '@skysmack/portal-ui';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRulesFieldsConfig extends FieldsConfig<AccessPolicyRule, number> {
    public validation = new AccessPolicyRulesValidation();
    public area = ACCESS_POLICY_RULES_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders
    ) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<AccessPolicyRule, number>): Field[] {
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
