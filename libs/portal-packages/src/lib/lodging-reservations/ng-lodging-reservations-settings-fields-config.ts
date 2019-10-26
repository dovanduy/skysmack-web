import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { LocalObject } from '@skysmack/framework';
import { LoadedPackage } from '@skysmack/ng-framework';
import { LodgingReservationsSettings, LODGING_RESERVATIONS_AREA_KEY, LODGING_RESERVATIONS_ADDITIONAL_PATHS } from '@skysmack/packages-lodging-reservations';
import { NgLodgingReservationsSettingsValidation } from '@skysmack/ng-lodging-reservations';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { IntFieldComponent, TimeFieldComponent, StringFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsSettingsFieldsConfig extends FieldsConfig<LodgingReservationsSettings, unknown> {
    public validation = new NgLodgingReservationsSettingsValidation();
    public area = LODGING_RESERVATIONS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, LODGING_RESERVATIONS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<LodgingReservationsSettings, unknown>): Field[] {
        const fields = [            
            new Field({
                component: TimeFieldComponent,
                value: settings ? settings.object.checkIn : undefined,
                key: 'checkIn',
                sortable: true,
                order: 1
            }),            
            new Field({
                component: TimeFieldComponent,
                value: settings ? settings.object.checkOut : undefined,
                key: 'checkOut',
                sortable: true,
                order: 2
            }),
            new Field({
                component: IntFieldComponent,
                value: settings ? settings.object.earliestCheckIn : undefined,
                key: 'earliestCheckIn',
                sortable: true,
                order: 3
            }),
            new Field({
                component: IntFieldComponent,
                value: settings ? settings.object.latestCheckOut : undefined,
                key: 'latestCheckOut',
                sortable: true,
                order: 4
            }),
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.timeZone : undefined,
                key: 'timeZone',
                order: 5,
                sortable: true
            })
        ];

        return fields;
    }
}
