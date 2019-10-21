import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { RatePlan, SITE_MINDER_RATE_PLANS_AREA_KEY, SITE_MINDER_RATE_PLANS_ADDITIONAL_PATHS } from '@skysmack/packages-siteminder';

import { NgSiteMinderRatePlansValidation } from '@skysmack/ng-siteminder';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { StringFieldComponent, HiddenFieldComponent, CheckboxFieldComponent } from '@skysmack/portal-fields';
import { FieldProviders, FieldsConfig } from '@skysmack/ng-fields';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderRatePlansFieldsConfig extends FieldsConfig<RatePlan, number> {
    public validation = new NgSiteMinderRatePlansValidation();
    public area = SITE_MINDER_RATE_PLANS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders
    ) {
        super(fieldProviders, SITE_MINDER_RATE_PLANS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<RatePlan, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            }),

            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.currencyCode : undefined,
                key: 'currencyCode',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            }),

            new Field({
                component: CheckboxFieldComponent,
                value: entity ? entity.object.beforeTax : undefined,
                key: 'beforeTax',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            })
        ];

        // Id field must only be added for edit forms.
        // If added to a create form, it won't be able to bind in the backend.
        if (entity && entity.object.id && entity.status !== LocalObjectStatus.CREATING) {
            fields.push(new Field({
                component: HiddenFieldComponent,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            }));
        }

        return fields;
    }
}
