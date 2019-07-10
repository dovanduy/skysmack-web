import { Injectable, Inject } from '@angular/core';
import { Field, ResultField } from '@skysmack/ng-dynamic-forms';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { StrIndex, LocalObject, API_DOMAIN_INJECTOR_TOKEN, ApiDomain, GlobalProperties } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { FormGroup } from '@angular/forms';
import { ReservationsPricingsType } from '@skysmack/packages-reservations-pricings';
import { Router } from '@angular/router';
import { LODGING_RESERVATIONS_AREA_KEY } from '@skysmack/packages-lodging-reservations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '@skysmack/ng-framework';
import { FieldProvider } from '@skysmack/ng-fields';
import { ResultFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsReservationsPricingsFieldProvider extends FieldProvider {
    public requested: StrIndex<boolean> = {};
    public area = '';

    constructor(
        public skysmackStore: NgSkysmackStore,
        public router: Router,
        public httpClient: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
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
                                        const lodgingTypeId = Number(form.get('lodgingTypeId').value);
                                        const persons = form.get('persons').value;
                                        const checkIn = form.get('checkIn').value;
                                        const checkOut = form.get('checkOut').value;

                                        if (lodgingTypeId && persons && checkIn && checkOut) {
                                            let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
                                            queryParameters = queryParameters.set('units', persons);
                                            queryParameters = queryParameters.set('start', checkIn);
                                            queryParameters = queryParameters.set('end', checkOut);
                                            return this.httpClient.get<any>(`${this.apiDomain.domain}/${lodgingReservationPricingPackage.object.path}/types/prices/${lodgingTypeId}`, { observe: 'response', params: queryParameters })
                                                .pipe(
                                                    map(httpResponse => {
                                                        const body: {
                                                            extendedData?: {
                                                                [key: string]: {
                                                                    prices: {
                                                                        change: number,
                                                                        currencyCode: string,
                                                                        price: number
                                                                    }[]
                                                                };
                                                            }
                                                        } = httpResponse.body;

                                                        const priceInfo = body && body.extendedData && body.extendedData && body.extendedData.rooms && body.extendedData.rooms.prices[0];

                                                        return `Price: ${priceInfo ? priceInfo.price : ''}  ${priceInfo ? priceInfo.currencyCode : ''}`;
                                                    }),
                                                    catchError((error) => {
                                                        if (!GlobalProperties.production) {
                                                            console.log(error); // TODO: How should this error be handled?
                                                        }
                                                        return of('');
                                                    })
                                                );
                                        } else {
                                            return of('');
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
