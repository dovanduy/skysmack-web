import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { LocalObject } from '@skysmack/framework';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { CheckboxFieldComponent } from '@skysmack/portal-fields';
import { WEBHOOKS_AREA_KEY, WEBHOOKS_ADDITIONAL_PATHS, WebhookSettings } from '@skysmack/packages-webhooks';
import { NgWebhookSettingsValidation } from './ng-webhooks-settings-validation';

@Injectable({ providedIn: 'root' })
export class NgWebhookSettingsFieldsConfig extends FieldsConfig<WebhookSettings, unknown> {
    public validation = new NgWebhookSettingsValidation();
    public area = WEBHOOKS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, WEBHOOKS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<WebhookSettings, unknown>): Field[] {
        const fields = [
            new Field({
                component: CheckboxFieldComponent,
                value: settings ? settings.object.enabled : false,
                key: 'enabled',
                order: 3
            })
        ];

        return fields;
    }
}
