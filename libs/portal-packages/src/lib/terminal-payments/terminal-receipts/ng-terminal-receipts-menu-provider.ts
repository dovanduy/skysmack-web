import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries } from '@skysmack/ng-framework';
import { TerminalPaymentsTypeId } from '@skysmack/package-types';
import { TerminalReceiptsIndexComponent } from './components/terminal-receipts-index/terminal-receipts-index.component';
import { TerminalPaymentsPermissions } from 'libs/packages/terminal-payments/src';

@Injectable({ providedIn: 'root' })
export class NgTerminalPaymentReceiptsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'PERSONS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, TerminalPaymentsTypeId, componentKey, TerminalReceiptsIndexComponent.COMPONENT_KEY, this.getTerminalReceiptsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, TerminalPaymentsTypeId, componentKey, TerminalReceiptsIndexComponent.COMPONENT_KEY, this.getTerminalReceiptsMenuItems, this.store);
    };

    public getTerminalReceiptsMenuAreas = () => {
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

    public getTerminalReceiptsMenuItems = () => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
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
                displayName: this.translationPrefix + 'FIELDS',
                area: 'manage',
                order: 2,
                icon: 'short_text',
                permissions: [
                    TerminalPaymentsPermissions.findTerminalReceiptsFields
                ],
                providedIn: [SIDEBAR]
            })
        ];
    }
}