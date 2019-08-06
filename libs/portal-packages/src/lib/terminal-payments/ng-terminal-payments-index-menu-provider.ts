import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { InvoicesPermissions } from '@skysmack/packages-invoices';

@Injectable({ providedIn: 'root' })
export class NgTerminalPaymentsIndexMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'TERMINAL_PAYMENTS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return of([
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 1
            })
        ])
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        if(componentKey === 'terminal-payments-index') {
            return of([
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
                })
            ]);
        } else {
           return of([]);
        }
    };
}