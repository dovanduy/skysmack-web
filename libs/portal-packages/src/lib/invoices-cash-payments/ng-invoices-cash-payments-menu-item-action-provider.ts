import { Injectable } from '@angular/core';
import { MenuItem } from '@skysmack/framework';
import { map, switchMap, take } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { StrIndex, LocalObject } from '@skysmack/framework';
import { MenuItemActionProvider } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { INVOICES_AREA_KEY, Invoice } from '@skysmack/packages-invoices';
import { CashPayment } from '@skysmack/packages-invoices-cash-payments';
import { InvoicesCashPaymentsPayComponent } from './invoices-cash-payments/components/invoices-cash-payments-pay/invoices-cash-payments-pay.component';
import { MatDialog } from '@angular/material/dialog';
import { InvoicesCashPaymentsType } from '@skysmack/package-types';

@Injectable({ providedIn: 'root' })
export class NgInvoicesCashPaymentsMenuItemActionProvider extends MenuItemActionProvider {

    public register: StrIndex<boolean> = {};

    constructor(
        public skysmackStore: NgSkysmackStore,
        public dialog: MatDialog
    ) {
        super();
    }

    public getMenuItemActions(packagePath: string, area: string, entity?: LocalObject<CashPayment, number>): Observable<MenuItem[]> {
        if (area === INVOICES_AREA_KEY) {
            return this.skysmackStore.getPackages().pipe(
                map(packages => packages.filter(_package => _package.object.type === InvoicesCashPaymentsType.id && _package.object.dependencies[0] === packagePath)),
                switchMap(packages => {
                    if (packages && packages.length > 0) {
                        const entityActionStreams$ = packages.map(_package => {
                            return of([
                                new MenuItem().asEventAction(`INVOICES_CASH_PAYMENTS.ENTITY_ACTION_PROVIDER.ENTITY_ACTION.CASH_PAYMENT`, (_this: NgInvoicesCashPaymentsMenuItemActionProvider, value: LocalObject<Invoice, number>) => {
                                    const dialogRef = _this.dialog.open(InvoicesCashPaymentsPayComponent, {
                                        width: '500px',
                                        data: { packagePath: _package.object.path, value }
                                    });

                                    dialogRef.afterClosed().pipe(take(1)).subscribe(() => { });
                                }, 'attach_money', this)
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
