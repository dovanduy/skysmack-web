import { CheckIn, LODGING_RESERVATIONS_CHECKIN_AREA_KEY } from '@skysmack/packages-lodging-reservations';
import { Injectable } from '@angular/core';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { NgLodgingReservationsValidation } from '@skysmack/ng-lodging-reservations';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { LoadedPackage } from '@skysmack/ng-framework';
import { LocalObject } from '@skysmack/framework';
import { LodgingSelectFieldComponent } from './lodging-reservations/lodging-select-field/lodging-select-field.component';
import { HiddenFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgCheckinFieldsConfig extends FieldsConfig<CheckIn, number> {
    public area = LODGING_RESERVATIONS_CHECKIN_AREA_KEY;
    public validation = new NgLodgingReservationsValidation();
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders
    ){ 
        super(fieldProviders, []);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<CheckIn, number>): Field[] {
        const fields: Field[] = [];

        fields.push(new Field({
            component: HiddenFieldComponent,
            value: '2019-10-28T15:30', // entity ? entity.object.lodgingId : undefined,
            key: 'checkIn',
            order: 4,
            showColumn: false,
            includeInRequest: false,
            disabled: true
        }));

        fields.push(new Field({
            component: HiddenFieldComponent,
            value: '2019-10-30T15:30', // entity ? entity.object.lodgingId : undefined,
            key: 'checkOut',
            order: 4,
            showColumn: false,
            includeInRequest: false,
            disabled: true
        }));
        
        fields.push( new Field({
            component: HiddenFieldComponent,
            value: 1, // entity ? entity.object.lodgingId : undefined,
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
