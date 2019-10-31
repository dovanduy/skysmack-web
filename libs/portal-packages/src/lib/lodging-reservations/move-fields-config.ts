import { LODGING_RESERVATIONS_CHECKIN_AREA_KEY, Move } from '@skysmack/packages-lodging-reservations';
import { Injectable } from '@angular/core';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { NgLodgingReservationsValidation } from '@skysmack/ng-lodging-reservations';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { LoadedPackage } from '@skysmack/ng-framework';
import { LocalObject } from '@skysmack/framework';
import { LodgingSelectFieldComponent } from './lodging-reservations/lodging-select-field/lodging-select-field.component';
import { HiddenFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgMoveFieldsConfig extends FieldsConfig<Move, number> {
    public area = LODGING_RESERVATIONS_CHECKIN_AREA_KEY;
    public validation = new NgLodgingReservationsValidation();
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders
    ) {
        super(fieldProviders, []);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<Move, number>): Field[] {
        const fields: Field[] = [];

        fields.push(new Field({
            component: HiddenFieldComponent,
            value: entity ? entity.object.reservation.checkIn : undefined,
            key: 'checkIn',
            order: 4,
            showColumn: false,
            includeInRequest: false,
            disabled: true
        }));

        fields.push(new Field({
            component: HiddenFieldComponent,
            value: entity ? entity.object.reservation.checkOut : undefined,
            key: 'checkOut',
            order: 4,
            showColumn: false,
            includeInRequest: false,
            disabled: true
        }));

        fields.push(new Field({
            component: HiddenFieldComponent,
            value: entity ? entity.object.reservation.lodgingTypeId : undefined,
            key: 'lodgingTypeId',
            order: 4,
            showColumn: false,
            includeInRequest: false,
            disabled: true
        }));

        fields.push(new Field({
            component: LodgingSelectFieldComponent,
            value: entity ? entity.object.lodgingId : undefined,
            key: 'lodgingId',
            order: 4,
            showColumn: false,
        }));

        return fields;
    }
}
