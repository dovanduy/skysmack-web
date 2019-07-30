import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { LocalObject } from '@skysmack/framework';
import { LoadedPackage } from '@skysmack/ng-framework';
import { LodgingReservationsSettings, LODGING_RESERVATIONS_AREA_KEY } from '@skysmack/packages-lodging-reservations';
import { NgLodgingReservationsSettingsValidation } from '@skysmack/ng-lodging-reservations';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { IntFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsSettingsFieldsConfig extends FieldsConfig<LodgingReservationsSettings, unknown> {
    public validation = new NgLodgingReservationsSettingsValidation();
    public area = LODGING_RESERVATIONS_AREA_KEY;
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
