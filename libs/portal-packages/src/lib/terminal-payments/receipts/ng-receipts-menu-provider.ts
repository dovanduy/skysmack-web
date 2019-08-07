import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { getMenuEntries } from '@skysmack/ng-framework';
import { TerminalPaymentsTypeId } from '@skysmack/package-types';
import { ReceiptsIndexComponent } from './components/receipts-index/receipts-index.component';

@Injectable({ providedIn: 'root' })
export class NgReceiptsMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'RECEIPTS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }
    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, TerminalPaymentsTypeId, componentKey, ReceiptsIndexComponent.COMPONENT_KEY, this.getReceiptsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, TerminalPaymentsTypeId, componentKey, ReceiptsIndexComponent.COMPONENT_KEY, this.getReceiptsMenuItems, this.store);
    };

    public getReceiptsMenuAreas = () => {
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

    public getReceiptsMenuItems = () => {
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
            new MenuItem({
                url: 'fields',
                displayName: this.translationPrefix + 'FIELDS',
                area: 'manage',
                order: 1,
                icon: 'shortText',
                permissions: [
                ],
                providedIn: ['sidebar']
            })
        ];
    };
}