import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';
import { LoadedPackage } from '@skysmack/ng-redux';
import { FieldsConfig, IntFieldComponent } from '@skysmack/portal-ui';
import { FieldProviders } from '@skysmack/portal-ui';
import { LodgingReservationsSettings } from '@skysmack/packages-lodging-reservations';
import { NgLodgingReservationsSettingsValidation } from '@skysmack/ng-packages';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsSettingsFieldsConfig extends FieldsConfig<LodgingReservationsSettings, unknown> {
    public validation = new NgLodgingReservationsSettingsValidation();

    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<LodgingReservationsSettings, unknown>): Field[] {
        const fields = [
            new Field({
                component: IntFieldComponent,
                value: settings ? settings.object.earliestCheckIn : undefined,
                key: 'earliestCheckIn',
                order: 1
            }),
            new Field({
                component: IntFieldComponent,
                value: settings ? settings.object.latestCheckOut : undefined,
                key: 'latestCheckOut',
                order: 2
            })
        ];

        return fields;
    }
}