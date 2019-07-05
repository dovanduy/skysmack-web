import { Injectable } from '@angular/core';
import { Field, ResultField } from '@skysmack/ng-dynamic-forms';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { StrIndex, LocalObject, DisplayColumn } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { StringFieldComponent, ResultFieldComponent } from '@skysmack/portal-ui';
import { FieldProvider } from '@skysmack/portal-ui';
import { Validators, FormGroup } from '@angular/forms';
import { ReservationsPricingsType } from '@skysmack/packages-reservations-pricings';
import { Router } from '@angular/router';
import { LodgingReservation } from '@skysmack/packages-lodging-reservations';
import { LODGINGS_AREA_KEY } from '@skysmack/packages-lodgings';

@Injectable({ providedIn: 'root' })
export class NgReservationsPricingsFieldProvider extends FieldProvider {
    public requested: StrIndex<boolean> = {};
    public area = '';

    constructor(
        public skysmackStore: NgSkysmackStore,
        public router: Router
    ) {
        super();
    }

    public getFields(packagePath: string, area: string, entity?: LocalObject<any, any>): Observable<Field[]> {
        if (area == LODGINGS_AREA_KEY) {
            return this.skysmackStore.getPackages().pipe(
                map(packages => packages.filter(_package => _package.object.type === ReservationsPricingsType.id)),
                map(lodgingReservationPricingPackages => {
                    if (lodgingReservationPricingPackages && lodgingReservationPricingPackages.length > 0) {
                        return lodgingReservationPricingPackages.map(lodgingReservationPricingPackage => {
                            const displayModifier = (column: DisplayColumn, providedEntity: LocalObject<LodgingReservation, number>): string => {
                                const extendedData: StrIndex<StrIndex<StrIndex<number>>> = providedEntity.object['extendedData'];
                                if (extendedData) {
                                    return Object.keys(extendedData)
                                        .filter(packageKey => packageKey === lodgingReservationPricingPackage.object.path)
                                        .map(packageKey => {
                                            const lodgingReservationPricings: StrIndex<StrIndex<number>> = extendedData[packageKey];
                                            let currencyCodes: StrIndex<number>;
                                            if (lodgingReservationPricings) {
                                                currencyCodes = lodgingReservationPricings['prices'];
                                            }
                                            if (currencyCodes) {
                                                return Object.keys(currencyCodes).map(currencyCodeKey => {
                                                    const currencyCode = currencyCodeKey.toUpperCase();
                                                    const price = currencyCodes[currencyCodeKey]['price'];
                                                    return `${price} ${currencyCode}`;
                                                }).join(', ');
                                            }

                                            return '';
                                        })[0];
                                } else {
                                    // TODO: Undecided. A trello card has been made.
                                }
                            };

                            return [
                                new Field({
                                    component: StringFieldComponent,
                                    value: undefined,
                                    key: 'lodgingReservationsPricing',
                                    validators: [Validators.required],
                                    order: 1,
                                    displayModifier,
                                    includeInForm: false,
                                    showColumn: true
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
