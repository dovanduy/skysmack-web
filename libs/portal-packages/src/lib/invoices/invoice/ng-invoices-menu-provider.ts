import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { setBackButton } from '@skysmack/ng-framework';
import { InvoicesPermissions } from '@skysmack/packages-invoices';

@Injectable({ providedIn: 'root' })
export class NgInvoicesMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'INVOICES.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return of([
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
        ])
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        if(componentKey === 'invoices-index') {
            return of([
                new MenuItem({
                    url: 'create',
                    displayName: this.translationPrefix + 'CREATE',
                    area: 'actions',
                    order: 1,
                    icon: 'add',
                    permissions: [
                        InvoicesPermissions.addInvoiceItems
                    ],
                    providedIn: ['sidebar']
                }),
                new MenuItem({
                    url: 'fields',
                    displayName: this.translationPrefix + 'FIELDS',
                    area: 'manage',
                    order: 2,
                    icon: 'shortText',
                    permissions: [
                        InvoicesPermissions.findInvoiceItemFields
                    ],
                    providedIn: ['sidebar']
                }),
                new MenuItem({
                    url: 'payments',
                    displayName: this.translationPrefix + 'PAYMENTS',
                    area: 'manage',
                    order: 3,
                    icon: 'shortText',
                    permissions: [
                        InvoicesPermissions.findInvoiceItemFields
                    ],
                    providedIn: ['sidebar']
                })
            ]);
        } else {
           return of([]);
        }
    };
}