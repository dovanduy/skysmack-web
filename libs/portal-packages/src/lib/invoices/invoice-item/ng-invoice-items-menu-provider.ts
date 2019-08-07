import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, setBackButtonV2 } from '@skysmack/ng-framework';
import { InvoicesPermissions } from '@skysmack/packages-invoices';
import { InvoicesTypeId } from '@skysmack/package-types';
import { InvoiceItemsIndexComponent } from './components/invoice-items-index/invoice-items-index.component';

@Injectable({ providedIn: 'root' })
export class NgInvoiceItemsMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'INVOICE_ITEMS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, InvoicesTypeId, componentKey, InvoiceItemsIndexComponent.COMPONENT_KEY, this.getInvoiceItemsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, InvoicesTypeId, componentKey, InvoiceItemsIndexComponent.COMPONENT_KEY, this.getInvoiceItemsMenuItems, this.store);
    };

    public getInvoiceItemsMenuAreas = () => {
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

    public getInvoiceItemsMenuItems = () => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    InvoicesPermissions.addInvoiceItems
                ],
                providedIn: ['sidebar', 'speedDial']
            }),
            new MenuItem({
                url: 'fields',
                displayName: this.translationPrefix + 'FIELDS',
                area: 'manage',
                order: 2,
                icon: 'short_text',
                permissions: [
                    InvoicesPermissions.findInvoiceItemFields
                ],
                providedIn: ['sidebar']
            }),
            setBackButtonV2('invoices')
        ];
    };
};