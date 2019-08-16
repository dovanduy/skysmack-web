import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, setConnectedParentPackage, getCombinedMenuEntries, getConnectedPackageMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { TerminalPaymentsTypeId, InvoicesTypeId } from '@skysmack/package-types';
import { TerminalPaymentsIndexComponent } from './components/terminal-payments-index/terminal-payments-index.component';
import { InvoicesIndexComponent } from '../invoices/invoice/components/invoices-index/invoices-index.component';
import { TerminalsIndexComponent } from './terminals/components/terminals-index/terminals-index.component';
import { TerminalPaymentsPermissions } from '@skysmack/packages-terminal-payments';
import { TerminalReceiptsIndexComponent } from './terminal-receipts/components/terminal-receipts-index/terminal-receipts-index.component';
import { TerminalPaymentReceiptsIndexComponent } from './terminal-payment-receipts/components/terminal-payment-receipts-index/terminal-payment-receipts-index.component';
import { ConnectionsIndexComponent } from './connections/components/connections-index/connections-index.component';

@Injectable({ providedIn: 'root' })
export class NgTerminalPaymentsIndexMenuProvider implements MenuProvider {
    public id = Guid.create().toString();

    public terminalsIndexTranslationPrefix = 'TERMINAL_PAYMENTS.INDEX.';
    public terminalsTranslationPrefix = 'TERMINALS.INDEX.';
    public terminalReceiptsTranslationPrefix = 'TERMINAL_RECEIPTS.INDEX.';
    public terminalPaymentReceiptsTranslationPrefix = 'TERMINAL_PAYMENT_RECEIPTS.INDEX.';
    public connectionsTranslationPrefix = 'CONNECTIONS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(
                packagePath,
                TerminalPaymentsTypeId,
                componentKey,
                TerminalPaymentsIndexComponent.COMPONENT_KEY,
                this.getTerminalPaymentsMenuAreas,
                this.store
            ),
            getMenuEntries<MenuArea>(
                packagePath,
                TerminalPaymentsTypeId,
                componentKey,
                TerminalsIndexComponent.COMPONENT_KEY,
                this.getTerminalsMenuAreas,
                this.store
            ),
            getMenuEntries<MenuArea>(
                packagePath,
                TerminalPaymentsTypeId,
                componentKey,
                TerminalReceiptsIndexComponent.COMPONENT_KEY,
                this.getTerminalReceiptsMenuAreas,
                this.store
            ),
            getMenuEntries<MenuArea>(
                packagePath,
                TerminalPaymentsTypeId,
                componentKey,
                TerminalPaymentReceiptsIndexComponent.COMPONENT_KEY,
                this.getTerminalPaymentReceiptsMenuAreas,
                this.store
            ),
            getMenuEntries<MenuArea>(packagePath,
                TerminalPaymentsTypeId,
                componentKey,
                ConnectionsIndexComponent.COMPONENT_KEY,
                this.getConnectionsMenuAreas,
                this.store
            )
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
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
            ),
            getMenuEntries<MenuItem>(
                packagePath,
                TerminalPaymentsTypeId,
                componentKey,
                TerminalsIndexComponent.COMPONENT_KEY,
                this.getTerminalsMenuItems,
                this.store
            ),
            getMenuEntries<MenuItem>(
                packagePath,
                TerminalPaymentsTypeId,
                componentKey,
                TerminalReceiptsIndexComponent.COMPONENT_KEY,
                this.getTerminalReceiptsMenuItems,
                this.store
            ),
            getMenuEntries<MenuItem>(
                packagePath,
                TerminalPaymentsTypeId,
                componentKey,
                TerminalPaymentReceiptsIndexComponent.COMPONENT_KEY,
                this.getTerminalPaymentReceiptsMenuItems,
                this.store
            ),
            getMenuEntries<MenuItem>(
                packagePath,
                TerminalPaymentsTypeId,
                componentKey,
                ConnectionsIndexComponent.COMPONENT_KEY,
                this.getConnectionsMenuItems,
                this.store
            )
        );
    };

    //#region TerminalsIndex
    private getTerminalPaymentsMenuAreas = (): MenuArea[] => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.terminalsIndexTranslationPrefix,
                order: 1
            })
        ];
    };

    private getTerminalPaymentsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'terminals',
                displayName: this.terminalsIndexTranslationPrefix + 'TERMINALS',
                area: 'manage',
                order: 1,
                icon: 'description',
                permissions: [
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'connections',
                displayName: this.terminalsIndexTranslationPrefix + 'CONNECTIONS',
                area: 'manage',
                order: 3,
                icon: 'description',
                permissions: [
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'payment-receipts',
                displayName: this.terminalsIndexTranslationPrefix + 'TERMINAL_PAYMENT_RECEIPTS',
                area: 'manage',
                order: 4,
                icon: 'description',
                permissions: [
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'receipts',
                displayName: this.terminalsIndexTranslationPrefix + 'TERMINAL_RECEIPTS',
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
    //#endregion

    //#region Terminals
    private getTerminalsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.terminalsTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.terminalsTranslationPrefix,
                order: 2
            })
        ];
    };

    private getTerminalsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.terminalsTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };
    //#endregion

    //#region TerminalReceipts
    private getTerminalReceiptsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.terminalReceiptsTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.terminalReceiptsTranslationPrefix,
                order: 2
            })
        ];
    }

    private getTerminalReceiptsMenuItems = (packagePath: string) => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.terminalReceiptsTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    TerminalPaymentsPermissions.addTerminalReceipts
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            new MenuItem({
                url: 'fields',
                displayName: this.terminalReceiptsTranslationPrefix + 'FIELDS',
                area: 'manage',
                order: 2,
                icon: 'short_text',
                permissions: [
                    TerminalPaymentsPermissions.findTerminalReceiptsFields
                ],
                providedIn: [SIDEBAR]
            }),
            setBackButton(packagePath)
        ];
    }
    //#endregion

    //#region TerminalPaymentReceipts
    private getTerminalPaymentReceiptsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.terminalPaymentReceiptsTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.terminalPaymentReceiptsTranslationPrefix,
                order: 2
            })
        ];
    }

    private getTerminalPaymentReceiptsMenuItems = (packagePath: string) => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.terminalPaymentReceiptsTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    TerminalPaymentsPermissions.addTerminalPaymentReceipts
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            new MenuItem({
                url: 'fields',
                displayName: this.terminalPaymentReceiptsTranslationPrefix + 'FIELDS',
                area: 'manage',
                order: 2,
                icon: 'short_text',
                permissions: [
                    TerminalPaymentsPermissions.findTerminalPaymentReceiptsFields
                ],
                providedIn: [SIDEBAR]
            }),
            setBackButton(packagePath)
        ];
    }
    //#endregion

    //#region Connections
    private getConnectionsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.connectionsTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.connectionsTranslationPrefix,
                order: 2
            })
        ];
    };

    private getConnectionsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.connectionsTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };
    //#endregion
}