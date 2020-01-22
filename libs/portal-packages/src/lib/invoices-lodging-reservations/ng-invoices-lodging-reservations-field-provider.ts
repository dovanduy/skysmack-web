import { Injectable } from '@angular/core';
import { Field } from '@skysmack/ng-dynamic-forms';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { StrIndex, LocalObject } from '@skysmack/framework';
import { Invoice } from '@skysmack/packages-invoices';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { LODGING_RESERVATIONS_AREA_KEY } from '@skysmack/packages-lodging-reservations';
import { FieldProvider } from '@skysmack/ng-fields';
import { InvoicesLodgingReservationsTypeId } from '@skysmack/package-types';
import { Guid } from 'guid-typescript';

@Injectable({ providedIn: 'root' })
export class NgInvoicesLodgingReservationsFieldProvider extends FieldProvider {

    public id = Guid.create().toString();
    public register: StrIndex<boolean> = {};

    constructor(
        public skysmackStore: NgSkysmackStore
    ) {
        super();
    }

    public getFields(packagePath: string, area: string, entity?: LocalObject<Invoice, number>): Observable<Field[]> {
        this.register = {};
        if (area === LODGING_RESERVATIONS_AREA_KEY) {
            return this.skysmackStore.getPackages().pipe(
                map(packages => packages.filter(_package => _package.object.type === InvoicesLodgingReservationsTypeId && _package.object.dependencies[1] === packagePath)),
                switchMap(packages => {
                    if (packages && packages.length > 0) {
                        return of([]);
                        // const fieldStreams$ = of([]); // To do: Provide fields if needed. See NgPersonsLodgingReservationsFieldProvider for proper implementation.
                        // return combineLatest(
                        //     fieldStreams$
                        // );
                    } else {
                        return of([]);
                    }
                }),
                map(values => values.reduce((acc, cur) => acc.concat(cur), []).filter(x => x))
            );
        } else {
            return of([]);
        }
    }
}
