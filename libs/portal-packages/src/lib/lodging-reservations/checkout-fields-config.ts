import { LODGING_RESERVATIONS_CHECKIN_AREA_KEY, Checkout } from '@skysmack/packages-lodging-reservations';
import { Injectable } from '@angular/core';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { NgLodgingReservationsValidation } from '@skysmack/ng-lodging-reservations';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { LoadedPackage } from '@skysmack/ng-framework';
import { LocalObject } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgCheckoutFieldsConfig extends FieldsConfig<Checkout, number> {
    public area = LODGING_RESERVATIONS_CHECKIN_AREA_KEY;
    public validation = new NgLodgingReservationsValidation();
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders
    ) {
        super(fieldProviders, []);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<Checkout, number>): Field[] {
        const fields: Field[] = [];
        return fields;
    }
}
