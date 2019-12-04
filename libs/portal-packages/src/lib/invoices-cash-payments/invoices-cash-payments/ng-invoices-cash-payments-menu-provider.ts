import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, setConnectedParentPackage, getCombinedMenuEntries, getConnectedPackageMenuEntries, getConnectedPackageCustomMenuEntries } from '@skysmack/ng-framework';
import { InvoicesCashPaymentsTypeId, InvoicesTypeId } from '@skysmack/package-types';
import { InvoicesCashPaymentsIndexComponent } from './components/invoices-cash-payments-index/invoices-cash-payments-index.component';
import { InvoicesIndexComponent } from '../../invoices/invoice/components/invoices-index/invoices-index.component';

@Injectable({ providedIn: 'root' })
export class NgInvoicesCashPaymentsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'INVOICES_CASH_PAYMENTS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath,
            InvoicesCashPaymentsTypeId,
            componentKey,
            InvoicesCashPaymentsIndexComponent.COMPONENT_KEY,
            this.getInvoicesCashPaymentsMenuAreas,
            this.store
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries(
            getMenuEntries<MenuItem>(packagePath,
                InvoicesCashPaymentsTypeId,
                componentKey,
                InvoicesCashPaymentsIndexComponent.COMPONENT_KEY,
                this.getInvoicesCashPaymentsMenuItems,
                this.store
            ),
            getConnectedPackageMenuEntries(
                packagePath,
                InvoicesCashPaymentsTypeId,
                InvoicesTypeId,
                componentKey,
                InvoicesIndexComponent.COMPONENT_KEY,
                this.store
            )
        );
    };

    private getInvoicesCashPaymentsMenuAreas = () => {
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

    private getInvoicesCashPaymentsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    shiftKey: true,
                    action: `/${packagePath}/create`
                },
                order: 1,
                icon: 'add',
                permissions: [

                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setConnectedParentPackage(this.store, packagePath)
        ];
    };
};