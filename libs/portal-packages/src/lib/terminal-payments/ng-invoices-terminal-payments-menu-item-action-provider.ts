import { Injectable } from '@angular/core';
import { MenuItem } from '@skysmack/framework';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { StrIndex, LocalObject } from '@skysmack/framework';
import { MenuItemActionProvider } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { INVOICES_AREA_KEY, Invoice } from '@skysmack/packages-invoices';
import { CashPayment } from '@skysmack/packages-invoices-cash-payments';
import { TerminalPaymentsTypeId } from '@skysmack/package-types';
import { MatDialog } from '@angular/material/dialog';
import { TerminalsPayComponent } from './terminals';
import { Guid } from 'guid-typescript';

@Injectable({ providedIn: 'root' })
export class NgInvoicesTerminalPaymentsMenuItemActionProvider extends MenuItemActionProvider {

    public id = Guid.create().toString();
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
                map(packages => packages.filter(_package => _package.object.type === TerminalPaymentsTypeId && _package.object.dependencies[1] === packagePath)),
                switchMap(packages => {
                    if (packages && packages.length > 0) {
                        const entityActionStreams$ = packages.map(_package => {
                            return of([
                                new MenuItem().asEventAction(`TERMINALS.ENTITY_ACTION_PROVIDER.ENTITY_ACTION.TERMINAL_PAYMENT`, (_this: NgInvoicesTerminalPaymentsMenuItemActionProvider, value: LocalObject<Invoice, number>) => {
                                    _this.dialog.open(TerminalsPayComponent, {
                                        width: '500px',
                                        data: { packagePath: _package.object.path, value }
                                    });
                                }, 'payment', this)
                            ]);
                        });
                        return combineLatest([
                            entityActionStreams$
                        ]);
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
