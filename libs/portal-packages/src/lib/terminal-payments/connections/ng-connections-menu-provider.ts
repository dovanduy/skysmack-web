import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { getMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { TerminalPaymentsTypeId } from '@skysmack/package-types';
import { ConnectionsIndexComponent } from './components/connections-index/connections-index.component';

@Injectable({ providedIn: 'root' })
export class NgConnectionsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'CONNECTIONS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { }
    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, TerminalPaymentsTypeId, componentKey, ConnectionsIndexComponent.COMPONENT_KEY, this.getConnectionsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, TerminalPaymentsTypeId, componentKey, ConnectionsIndexComponent.COMPONENT_KEY, this.getConnectionsMenuItems, this.store);
    };

    public getConnectionsMenuAreas = () => {
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

    public getConnectionsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                ],
                providedIn: ['sidebar', SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };
}