import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, setConnectedParentPackage, getCombinedMenuEntries, getConnectedPackageMenuEntries } from '@skysmack/ng-framework';
import { TerminalPaymentsTypeId, InvoicesTypeId } from '@skysmack/package-types';
import { TerminalPaymentsIndexComponent } from './components/terminal-payments-index/terminal-payments-index.component';
import { InvoicesIndexComponent } from '../invoices/invoice/components/invoices-index/invoices-index.component';

@Injectable({ providedIn: 'root' })
export class NgTerminalPaymentsIndexMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'TERMINAL_PAYMENTS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(
            packagePath,
            TerminalPaymentsTypeId,
            componentKey,
            TerminalPaymentsIndexComponent.COMPONENT_KEY,
            this.getTerminalPaymentsMenuAreas,
            this.store
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries(
            getMenuEntries<MenuItem>(
                packagePath,
                TerminalPaymentsTypeId,
                componentKey,
                TerminalPaymentsIndexComponent.COMPONENT_KEY,
                this.getTerminalPaymentsMenuItems,
                this.store
            ),
            getConnectedPackageMenuEntries(
                packagePath,
                TerminalPaymentsTypeId,
                InvoicesTypeId,
                componentKey,
                InvoicesIndexComponent.COMPONENT_KEY,
                this.store
            )
        );
    };

    public getTerminalPaymentsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 1
            })
        ];
    };

    public getTerminalPaymentsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'terminals',
                displayName: this.translationPrefix + 'TERMINALS',
                area: 'manage',
                order: 1,
                icon: 'description',
                permissions: [
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'connections',
                displayName: this.translationPrefix + 'CONNECTIONS',
                area: 'manage',
                order: 3,
                icon: 'description',
                permissions: [
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'receipts',
                displayName: this.translationPrefix + 'RECEIPTS',
                area: 'manage',
                order: 4,
                icon: 'description',
                permissions: [
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'payment-receipts',
                displayName: this.translationPrefix + 'PAYMENT_RECEIPTS',
                area: 'manage',
                order: 4,
                icon: 'description',
                permissions: [
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'terminal-receipts',
                displayName: this.translationPrefix + 'TERMINAL_RECEIPTS',
                area: 'manage',
                order: 4,
                icon: 'description',
                permissions: [
                ],
                providedIn: [SIDEBAR]
            }),
            setConnectedParentPackage(this.store, packagePath)
        ];
    };
}