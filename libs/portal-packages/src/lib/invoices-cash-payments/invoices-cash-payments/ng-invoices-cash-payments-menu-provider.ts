import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries } from '@skysmack/ng-framework';
import { InvoicesCashPaymentsTypeId } from '@skysmack/package-types';
import { InvoicesCashPaymentsIndexComponent } from './components/invoices-cash-payments-index/invoices-cash-payments-index.component';

@Injectable({ providedIn: 'root' })
export class NgInvoicesCashPaymentsMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'INVOICES_CASH_PAYMENTS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, InvoicesCashPaymentsTypeId, componentKey, InvoicesCashPaymentsIndexComponent.COMPONENT_KEY, this.getInvoicesCashPaymentsMenuAreas(), this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, InvoicesCashPaymentsTypeId, componentKey, InvoicesCashPaymentsIndexComponent.COMPONENT_KEY, this.getInvoicesCashPaymentsMenuItems(), this.store);
    };

    public getInvoicesCashPaymentsMenuAreas= () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.translationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ];
    };

    public getInvoicesCashPaymentsMenuItems = () => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    
                ],
                providedIn: ['sidebar', 'speedDial']
            })
        ];
    };
};