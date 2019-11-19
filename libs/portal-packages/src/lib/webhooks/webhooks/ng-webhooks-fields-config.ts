import { Injectable } from '@angular/core';
import { LocalObject, LocalObjectStatus, HttpMethod } from '@skysmack/framework';
import { Webhook, WEBHOOKS_AREA_KEY, WEBHOOKS_ADDITIONAL_PATHS } from '@skysmack/packages-webhooks';
import { NgWebhooksValidation } from '@skysmack/ng-webhooks';
import { LoadedPackage } from '@skysmack/ng-framework';
import { Validators } from '@angular/forms';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { StringFieldComponent, HiddenFieldComponent, SelectFieldComponent, KeyValueArrayFieldComponent } from '@skysmack/portal-fields';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgWebhooksFieldsConfig extends FieldsConfig<Webhook, number> {
    public validation = new NgWebhooksValidation();
    public area = WEBHOOKS_AREA_KEY;
    public formRules: FormRule[] = [
    ];

    constructor(
        public fieldProviders: FieldProviders
    ) {
        super(fieldProviders, WEBHOOKS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<Webhook, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.url : undefined,
                key: 'url',
                order: 1,
                showColumn: true,
                sortable: true
            }),
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.httpMethod : undefined,
                key: 'httpMethod',
                optionsData$: of(HttpMethod),
                optionsDataType: 'ts-enum',
                order: 2,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: KeyValueArrayFieldComponent,
                value: entity ? entity.object.customHeaders : undefined,
                key: 'customHeaders',
                order: 3,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.packagePath : undefined,
                key: 'packagePath',
                order: 4,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.source : undefined,
                key: 'source',
                order: 5,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.eventType : undefined,
                key: 'eventType',
                order: 6,
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
