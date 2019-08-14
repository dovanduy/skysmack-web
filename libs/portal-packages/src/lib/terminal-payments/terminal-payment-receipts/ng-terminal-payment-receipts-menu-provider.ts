import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { TerminalPaymentsTypeId } from '@skysmack/package-types';
import { TerminalPaymentReceiptsIndexComponent } from './components/terminal-payment-receipts-index/terminal-payment-receipts-index.component';
import { TerminalPaymentsPermissions } from 'libs/packages/terminal-payments/src';

@Injectable({ providedIn: 'root' })
export class NgTerminalReceiptsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'PERSONS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, TerminalPaymentsTypeId, componentKey, TerminalPaymentReceiptsIndexComponent.COMPONENT_KEY, this.getTerminalPaymentReceiptsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, TerminalPaymentsTypeId, componentKey, TerminalPaymentReceiptsIndexComponent.COMPONENT_KEY, this.getTerminalPaymentReceiptsMenuItems, this.store);
    };

    public getTerminalPaymentReceiptsMenuAreas = () => {
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
    }

    public getTerminalPaymentReceiptsMenuItems = (packagePath: string) => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
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
                displayName: this.translationPrefix + 'FIELDS',
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
}