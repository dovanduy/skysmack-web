import { Injectable } from '@angular/core';
import { FormRule, SelectField } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';

import { FieldsConfig, SelectFieldComponent, HiddenFieldComponent, RolesSelectFieldComponent } from '@skysmack/portal-ui';
import { AccessPolicyRole, AccessPolicyRoleKey, AccessPolicyRule, ACCESS_POLICY_ROLES_AREA_KEY } from '@skysmack/packages-skysmack-core';
import { Validators } from '@angular/forms';
import { SelectFieldOption } from '@skysmack/ng-ui';
import { AccessPolicyRolesValidation, NgAccessPolicyRulesStore, NgAccessPolicyRulesActions } from '@skysmack/ng-core';
import { FieldProviders } from '@skysmack/portal-ui';
import { NgRolesStore, NgRolesActions } from '@skysmack/ng-packages';
import { LoadedPackage } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyRolesFieldsConfig extends FieldsConfig<AccessPolicyRole, AccessPolicyRoleKey> {
    public validation = new AccessPolicyRolesValidation();
    public area = ACCESS_POLICY_ROLES_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public accessPolicyRulesStore: NgAccessPolicyRulesStore,
        public accessPolicyRulesActions: NgAccessPolicyRulesActions,
        public rolesStore: NgRolesStore,
        public rolesActions: NgRolesActions,
        public fieldProviders: FieldProviders
    ) { super(fieldProviders); }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<AccessPolicyRole, AccessPolicyRoleKey>): Field[] {

        const modifyDisplayName = (options: SelectFieldOption[], optionsData: LocalObject<AccessPolicyRule, number>[]) => {
            const accessPolicyRules = optionsData;
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
                component: SelectFieldComponent,
                value: entity ? entity.object.id.ruleId : undefined,
                key: 'ruleId',
                displayKey: 'rule',
                displaySubKey: 'object.id',
                optionsData$: this.accessPolicyRulesStore.get('skysmack'),
                getDependencies: () => { this.accessPolicyRulesActions.getPaged('skysmack', new PagedQuery()); },
                validators: [Validators.required],
                displayNameSelector: 'object.id',
                modifyDisplayName,
                order: 2,
                showColumn: true
            }),

            new SelectField({
                component: RolesSelectFieldComponent,
                value: entity ? entity.object.id.roleId : undefined,
                key: 'roleId',
                validators: [Validators.required],
                order: 2,
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
