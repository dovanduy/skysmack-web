import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { getMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { InvoicesPermissions } from 'libs/packages/invoices/src/permissions/invoices-permissions';
import { InvoicesTypeId } from '@skysmack/package-types';
import { InvoicePaymentsIndexComponent } from './components/invoice-payments-index/invoice-payments-index.component';

@Injectable({ providedIn: 'root' })
export class NgInvoicePaymentsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'INVOICE_PAYMENTS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, InvoicesTypeId, componentKey, InvoicePaymentsIndexComponent.COMPONENT_KEY, this.getInvoicePaymentsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, InvoicesTypeId, componentKey, InvoicePaymentsIndexComponent.COMPONENT_KEY, this.getInvoicePaymentsMenuItems, this.store);
    };

    private getInvoicePaymentsMenuAreas = () => {
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

    private getInvoicePaymentsMenuItems = (packagePath: string): MenuItem[] => {
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
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            new MenuItem({
                url: 'fields',
                displayName: this.translationPrefix + 'FIELDS',
                area: 'manage',
                order: 2,
                icon: 'short_text',
                permissions: [
                    InvoicesPermissions.findInvoicePaymentFields
                ],
                providedIn: [SIDEBAR]
            }),
            setBackButton(packagePath)
        ];
    };
}