import { Injectable } from '@angular/core';
import { EntityAction } from '@skysmack/ng-ui';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { StrIndex, LocalObject } from '@skysmack/framework';
import { EntityActionProvider } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { InvoicesCashPaymentsType, CashPayment } from 'libs/packages/invoices-cash-payments/src';
import { INVOICES_AREA_KEY } from '@skysmack/packages-invoices';

@Injectable({ providedIn: 'root' })
export class NgInvoicesCashPaymentsEntityActionProvider extends EntityActionProvider {

    public register: StrIndex<boolean> = {};

    constructor(
        public skysmackStore: NgSkysmackStore
    ) {
        super();
    }

    public getEntityActions(packagePath: string, area: string, entity?: LocalObject<CashPayment, number>): Observable<EntityAction[]> {
        if (area === INVOICES_AREA_KEY) {
            return this.skysmackStore.getPackages().pipe(
                map(packages => packages.filter(_package => _package.object.type === InvoicesCashPaymentsType.id && _package.object.dependencies[0] === packagePath)),
                switchMap(packages => {
                    if (packages && packages.length > 0) {
                        const entityActionStreams$ = packages.map(_package => {
                            return of([
                                new EntityAction().asUrlAction(`/${_package.object.path}`, 'Cash payment', 'attach_money', 'pay')
                            ]);
                        });
                        return combineLatest(entityActionStreams$);
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
