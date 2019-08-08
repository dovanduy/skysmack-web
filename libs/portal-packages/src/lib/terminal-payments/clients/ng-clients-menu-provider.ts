import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { getMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { TerminalPaymentsTypeId } from '@skysmack/package-types';
import { ClientsIndexComponent } from './components/clients-index/clients-index.component';

@Injectable({ providedIn: 'root' })
export class NgClientsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'CLIENTS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { }
    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, TerminalPaymentsTypeId, componentKey, ClientsIndexComponent.COMPONENT_KEY, this.getClientsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, TerminalPaymentsTypeId, componentKey, ClientsIndexComponent.COMPONENT_KEY, this.getClientsMenuItems, this.store);
    };

    public getClientsMenuAreas = () => {
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

    public getClientsMenuItems = (packagePath: string): MenuItem[] => {
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
            }),
            setBackButton(packagePath)
        ];
    };
}