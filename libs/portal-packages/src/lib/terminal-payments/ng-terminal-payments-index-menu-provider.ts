import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { InvoicesPermissions } from '@skysmack/packages-invoices';
import { getMenuEntries, setConnectedPackage } from '@skysmack/ng-framework';
import { TerminalPaymentsTypeId } from '@skysmack/package-types';
import { TerminalPaymentsIndexComponent } from './components/terminal-payments-index/terminal-payments-index.component';

@Injectable({ providedIn: 'root' })
export class NgTerminalPaymentsIndexMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'TERMINAL_PAYMENTS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }
    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, TerminalPaymentsTypeId, componentKey, TerminalPaymentsIndexComponent.COMPONENT_KEY, this.getTerminalPaymentsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, TerminalPaymentsTypeId, componentKey, TerminalPaymentsIndexComponent.COMPONENT_KEY, this.getTerminalPaymentsMenuItems, this.store);
    };

    public getTerminalPaymentsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 1
            }),
            this.getConnectedPackageMenuArea()
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
                providedIn: ['sidebar']
            }),
            new MenuItem({
                url: 'clients',
                displayName: this.translationPrefix + 'CLIENTS',
                area: 'manage',
                order: 2,
                icon: 'description',
                permissions: [
                ],
                providedIn: ['sidebar']
            }),
            new MenuItem({
                url: 'connections',
                displayName: this.translationPrefix + 'CONNECTIONS',
                area: 'manage',
                order: 3,
                icon: 'description',
                permissions: [
                ],
                providedIn: ['sidebar']
            }),
            new MenuItem({
                url: 'receipts',
                displayName: this.translationPrefix + 'RECEIPTS',
                area: 'manage',
                order: 4,
                icon: 'description',
                permissions: [
                ],
                providedIn: ['sidebar']
            }),
            setConnectedPackage(this.store, packagePath)
        ];
    };
}