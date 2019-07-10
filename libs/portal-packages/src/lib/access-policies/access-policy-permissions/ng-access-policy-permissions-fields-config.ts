import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { AccessPolicyPermission, AccessPolicyRule, ACCESS_POLICY_PERMISSIONS_AREA_KEY } from '@skysmack/packages-skysmack-core';
import { AccessPolicyPermissionsValidation, NgAccessPolicyRulesStore } from '@skysmack/ng-packages';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FormRule, Field, SelectFieldOption, SelectField } from '@skysmack/ng-dynamic-forms';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { FieldProviders, FieldsConfig } from '@skysmack/ng-fields';
import { SelectFieldComponent, AvailablePermissionsFieldComponent, IntFieldComponent, CheckboxFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyPermissionsFieldsConfig extends FieldsConfig<AccessPolicyPermission, number> {
    public validation = new AccessPolicyPermissionsValidation();
    public area = ACCESS_POLICY_PERMISSIONS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public accessPolicyRulesStore: NgAccessPolicyRulesStore,
        public skysmackStore: NgSkysmackStore,
        public fieldProviders: FieldProviders
    ) { super(fieldProviders); }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<AccessPolicyPermission, number>): Field[] {

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

        const fields = [
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.packagePath : undefined,
                key: 'packagePath',
                optionsData$: this.skysmackStore.getPackages(),
                extraOptions: [{
                    value: null,
                    displayName: 'None'
                }] as SelectFieldOption[],
                valueSelector: 'object.path',
                order: 2,
                showColumn: true
            }),

            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.ruleId : undefined,
                key: 'ruleId',
                optionsData$: this.accessPolicyRulesStore.get('access-policies'),
                displayNameSelector: 'object.id',
                modifyDisplayName,
                order: 2,
                showColumn: true
            }),

            new Field({
                component: AvailablePermissionsFieldComponent,
                value: entity ? entity.object.permission : undefined,
                key: 'permission',
                order: 3,
                showColumn: true
            }),

            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.order : false,
                key: 'order',
                validators: [Validators.required],
                order: 4,
                showColumn: true
            }),

            new Field({
                component: CheckboxFieldComponent,
                value: entity ? entity.object.isTopLevel : false,
                key: 'isTopLevel',
                validators: [Validators.required],
                order: 4,
                showColumn: true
            }),
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
