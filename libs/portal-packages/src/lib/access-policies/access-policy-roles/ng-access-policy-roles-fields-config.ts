import { Injectable } from '@angular/core';
import { AccessPolicyRole, AccessPolicyRoleKey, ACCESS_POLICY_ROLES_AREA_KEY, AccessPolicyRule } from '@skysmack/packages-skysmack-core';
import { AccessPolicyRolesValidation, NgAccessPolicyRulesStore, NgAccessPolicyRulesActions, NgRolesStore, NgRolesActions, NgAccessPolicyRolesStore, NgAccessPolicyRolesActions } from '@skysmack/ng-packages';
import { FormRule, Field, SelectFieldOption, SelectField } from '@skysmack/ng-dynamic-forms';
import { Router } from '@angular/router';
import { LoadedPackage } from '@skysmack/ng-framework';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { Validators } from '@angular/forms';
import { RolesSelectFieldComponent } from '../../identities/identity-roles/components/roles-select-field/roles-select-field.component';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { SelectFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';

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
        public accessPolicyRolesStore: NgAccessPolicyRolesStore,
        public accessPolicyRolesActions: NgAccessPolicyRolesActions,
        public fieldProviders: FieldProviders,
        public router: Router
    ) { super(fieldProviders); }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<AccessPolicyRole, AccessPolicyRoleKey>): Field[] {
        const packagePath = this.router.url.split('/')[1];

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
                optionsData$: this.accessPolicyRulesStore.get('access-policies'),
                getDependencies: () => { this.accessPolicyRulesActions.getPaged('access-policies', new PagedQuery()); },
                displayNameSelector: 'object.id',
                modifyDisplayName,
                order: 2,
                showColumn: true
            }),

            new SelectField({
                component: RolesSelectFieldComponent,
                value: entity ? entity.object.id.roleId : undefined,
                key: 'roleId',
                displayKey: 'id',
                displaySubKey: 'roleId',
                validators: [Validators.required],
                displayNameSelector: 'object.id',
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
