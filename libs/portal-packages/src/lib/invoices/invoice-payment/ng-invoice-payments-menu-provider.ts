import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { setBackButton, getMenuEntries } from '@skysmack/ng-framework';
import { InvoicesPermissions } from 'libs/packages/invoices/src/permissions/invoices-permissions';
import { InvoicesTypeId } from '@skysmack/package-types';
import { InvoicePaymentsIndexComponent } from './components/invoice-payments-index/invoice-payments-index.component';

@Injectable({ providedIn: 'root' })
export class NgInvoicePaymentsMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'INVOICE_PAYMENTS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, InvoicesTypeId, componentKey, InvoicePaymentsIndexComponent.COMPONENT_KEY, this.getInvoicePaymentsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, InvoicesTypeId, componentKey, InvoicePaymentsIndexComponent.COMPONENT_KEY, this.getInvoicePaymentsMenuItems, this.store);
    };

    public getInvoicePaymentsMenuAreas = () => {
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

    public getInvoicePaymentsMenuItems = () => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    InvoicesPermissions.addInvoicePayments
                ],
                providedIn: ['sidebar', 'speedDial']
            }),
            new MenuItem({
                url: 'fields',
                displayName: this.translationPrefix + 'FIELDS',
                area: 'manage',
                order: 2,
                icon: 'shortText',
                permissions: [
                    InvoicesPermissions.findInvoicePaymentFields
                ],
                providedIn: ['sidebar']
            })
        ];
        //.pipe(setBackButton({ customPath: '/invoices' }));
    };
}