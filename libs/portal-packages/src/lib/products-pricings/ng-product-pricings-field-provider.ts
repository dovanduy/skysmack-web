import { Injectable } from '@angular/core';
import { Field } from '@skysmack/ng-ui';
import { map } from 'rxjs/operators';
import { PersonsLodgingReservationsType } from '@skysmack/packages-persons-lodging-reservations';
import { Observable } from 'rxjs';
import { StrIndex, LocalObject, DisplayColumn } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { StringFieldComponent } from '@skysmack/portal-ui';
import { FieldProvider } from '@skysmack/portal-ui';
import { Validators } from '@angular/forms';
import { Product } from '@skysmack/packages-products';

@Injectable({ providedIn: 'root' })
export class NgProductPricingsFieldProvider extends FieldProvider {
    public requested: StrIndex<boolean> = {};

    constructor(
        public skysmackStore: NgSkysmackStore,
    ) {
        super();
    }
    public getFields(packagePath: string, entity?: LocalObject<any, any>): Observable<Field[]> {
        return this.skysmackStore.getPackages().pipe(
            map(packages => packages.filter(_package => _package.object.type === PersonsLodgingReservationsType.id && _package.object.dependencies[1] === packagePath)),
            map(() => {

                const displayModifier = (column: DisplayColumn, providedEntity: LocalObject<Product, number>): string => {
                    const extendedData: StrIndex<StrIndex<StrIndex<number>>> = providedEntity.object['extendedData'];

                    if (extendedData) {
                        return Object.keys(extendedData)
                            .map(packageKey => {
                                const productPricings: StrIndex<StrIndex<number>> = extendedData[packageKey];
                                let currencyCodes: StrIndex<number>;
                                if (productPricings) {
                                    currencyCodes = productPricings['prices'];
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
                        // TODO: Undecided. A trello task has been made.
                    }
                };

                return [
                    new Field({
                        component: StringFieldComponent,
                        value: undefined,
                        key: 'productsPricing',
                        validators: [Validators.required],
                        order: 1,
                        displayModifier,
                        includeInForm: false,
                        showColumn: true
                    })
                ];
            })
        );
    }
}
