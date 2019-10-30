import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { LocalObject } from '@skysmack/framework';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { StringFieldComponent } from '@skysmack/portal-fields';
import { CallDataSettings } from '@skysmack/packages-3cx'
import { NgCallDataSettingsValidation } from './ng-call-data-settings-validation';
import { CallDataFieldComponent } from './fields/call-data-field/call-data-field.component';

@Injectable({ providedIn: 'root' })
export class NgCallDataSettingsFieldsConfig extends FieldsConfig<CallDataSettings, unknown> {
    public validation = new NgCallDataSettingsValidation();
    public area = 'call_data_settings';
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, []);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<CallDataSettings, unknown>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.currencyCode : false,
                key: 'currencyCode',
                order: 2,
                sortable: true
            }),
            new Field({
                component: CallDataFieldComponent,
                value: settings ? settings.object.outputFields : undefined,
                key: 'outputFields',
                order: 1,
                sortable: true
            })
        ];

        return fields;
    }
}
