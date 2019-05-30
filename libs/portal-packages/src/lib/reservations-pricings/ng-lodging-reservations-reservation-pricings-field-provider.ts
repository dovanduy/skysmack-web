import { Injectable } from '@angular/core';
import { Field, ResultField } from '@skysmack/ng-ui';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { StrIndex, LocalObject } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { ResultFieldComponent } from '@skysmack/portal-ui';
import { FieldProvider } from '@skysmack/portal-ui';
import { FormGroup } from '@angular/forms';
import { ReservationsPricingsType } from '@skysmack/packages-reservations-pricings';
import { Router } from '@angular/router';
import { LODGING_RESERVATIONS_AREA_KEY } from '@skysmack/packages-lodging-reservations';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsReservationsPricingsFieldProvider extends FieldProvider {
    public requested: StrIndex<boolean> = {};
    public area = '';

    constructor(
        public skysmackStore: NgSkysmackStore,
        public router: Router
    ) {
        super();
    }

    public getFields(packagePath: string, area: string, entity?: LocalObject<any, any>): Observable<Field[]> {
        if (area == LODGING_RESERVATIONS_AREA_KEY) {
            return this.skysmackStore.getPackages().pipe(
                map(packages => packages.filter(_package => _package.object.type === ReservationsPricingsType.id)),
                map(lodgingReservationPricingPackages => {
                    if (lodgingReservationPricingPackages && lodgingReservationPricingPackages.length > 0) {
                        return lodgingReservationPricingPackages.map(lodgingReservationPricingPackage => {
                            return [
                                new ResultField({
                                    component: ResultFieldComponent,
                                    key: 'result',
                                    value: undefined,
                                    disabled: true,
                                    includeInRequest: false,
                                    resultLogic: (valueChanges: StrIndex<any>, fields: Field[], form: FormGroup) => {
                                        const persons = Number(form.get('persons').value);
                                        const checkIn = form.get('checkIn').value;
                                        const checkOut = form.get('checkOut').value;
                                        if (persons && checkIn && checkOut) {
                                            return `Staying ${persons} from ${checkIn ? checkIn : '???'} to ${checkOut ? checkOut : '???'} costs ${persons * 1000}`;
                                        } else {
                                            return undefined;
                                        }
                                    }
                                })
                            ];
                        }).reduce((a, b) => a.concat(b), []);
                    }
                    return [];
                })
            );
        } else {
            return of([]);
        }
    }
}
