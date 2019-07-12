import { Injectable } from '@angular/core';
import { MenuItem } from '@skysmack/framework';
import { map, switchMap, take, } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { StrIndex, LocalObject } from '@skysmack/framework';
import { MenuItemActionProvider } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { INVOICES_AREA_KEY, Invoice } from '@skysmack/packages-invoices';
import { CashPayment } from '@skysmack/packages-invoices-cash-payments';
import { TerminalPaymentsType } from '@skysmack/package-types';
import { MatDialog } from '@angular/material/dialog';
import { TerminalsPayComponent } from './terminals';

@Injectable({ providedIn: 'root' })
export class NgInvoicesTerminalPaymentsMenuItemActionProvider extends MenuItemActionProvider {

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
                map(packages => packages.filter(_package => _package.object.type === TerminalPaymentsType.id && _package.object.dependencies[0] === packagePath)),
                switchMap(packages => {
                    if (packages && packages.length > 0) {
                        const entityActionStreams$ = packages.map(_package => {
                            return of([
                                new MenuItem().asEventAction(`TERMINALS.ENTITY_ACTION_PROVIDER.ENTITY_ACTION.TERMINAL_PAYMENT`, (_this: NgInvoicesTerminalPaymentsMenuItemActionProvider, value: LocalObject<Invoice, number>) => {
                                    const dialogRef = _this.dialog.open(TerminalsPayComponent, {
                                        width: '500px',
                                        data: { packagePath: _package.object.path, value }
                                    });

                                    dialogRef.afterClosed().pipe(take(1)).subscribe(() => { });
                                }, 'payment', this)
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
