import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, SelectField, SelectFieldOption } from '@skysmack/ng-ui';
import { LocalObject, Package, LocalObjectStatus } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';
import { FieldsConfig, SelectFieldComponent, HiddenFieldComponent, CheckboxFieldComponent, IntFieldComponent, AvailablePermissionsFieldComponent } from '@skysmack/portal-ui';
import { AccessPolicyPermission, AccessPolicyRule } from '@skysmack/packages-skysmack-core';
import { AccessPolicyPermissionsValidation } from '@skysmack/ng-packages';

export interface NgAccessPolicyPermissionFormDependencies {
    installedPackages: LocalObject<Package, string>[];
    availableAccessPolicyRules: LocalObject<AccessPolicyRule, number>[];
}

@Injectable({ providedIn: 'root' })
export class NgAccessPolicyPermissionsFieldsConfig extends FieldsConfig<AccessPolicyPermission, number, NgAccessPolicyPermissionFormDependencies> {
    public validation = new AccessPolicyPermissionsValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<AccessPolicyPermission, number>, dependencies?: NgAccessPolicyPermissionFormDependencies): Field[] {

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

        const fields = [
            new SelectField({
                component: SelectFieldComponent,
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
                component: SelectFieldComponent,
                value: entity ? entity.object.ruleId : undefined,
                key: 'ruleId',
                optionsData: dependencies && dependencies.availableAccessPolicyRules,
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
