import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { InvoicesPermissions } from '@skysmack/packages-invoices';
import { getMenuEntries } from '@skysmack/ng-framework';
import { TerminalPaymentsTypeId } from '@skysmack/package-types';
import { TerminalsIndexComponent } from './components/terminals-index/terminals-index.component';

@Injectable({ providedIn: 'root' })
export class NgTerminalsMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'TERMINALS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }
    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, TerminalPaymentsTypeId, componentKey, TerminalsIndexComponent.COMPONENT_KEY, this.getTerminalsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, TerminalPaymentsTypeId, componentKey, TerminalsIndexComponent.COMPONENT_KEY, this.getTerminalsMenuItems, this.store);
    };

    public getTerminalsMenuAreas = () => {
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

    public getTerminalsMenuItems = () => {
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
}