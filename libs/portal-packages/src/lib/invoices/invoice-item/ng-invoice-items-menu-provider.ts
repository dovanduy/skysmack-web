import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, LocalObject, Package, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, setBackButton, getCombinedMenuEntries, getConnectedPackageCustomMenuEntries } from '@skysmack/ng-framework';
import { InvoicesPermissions } from '@skysmack/packages-invoices';
import { InvoicesTypeId, InvoicesProductsTypeId } from '@skysmack/package-types';
import { InvoiceItemsIndexComponent } from './components/invoice-items-index/invoice-items-index.component';
import { InvoicesProductsAddProductsComponent } from '../../invoices-products/invoices-products/components/invoices-products-add-products/invoices-products-add-products.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class NgInvoiceItemsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'INVOICE_ITEMS.INDEX.';

    constructor(
        private store: NgSkysmackStore,
        public dialog: MatDialog
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, InvoicesTypeId, componentKey, InvoiceItemsIndexComponent.COMPONENT_KEY, this.getInvoiceItemsMenuAreas, this.store);
    };

    public getMenuItems = (packagePath: string, componentKey: string): Observable<MenuItem[]> => {
        return getCombinedMenuEntries(
            getMenuEntries<MenuItem>(packagePath, InvoicesTypeId, componentKey, InvoiceItemsIndexComponent.COMPONENT_KEY, this.getInvoiceItemsMenuItems, this.store),
            getConnectedPackageCustomMenuEntries(
                packagePath,
                InvoicesProductsTypeId,
                InvoicesTypeId,
                componentKey,
                InvoiceItemsIndexComponent.COMPONENT_KEY,
                this.store,
                (_package: LocalObject<Package, string>) => new MenuItem({
                    area: 'actions',
                    providedIn: [SIDEBAR, SPEEDDIAL]
                }).asEventAction(`${_package.object.name}`, (_this: NgInvoiceItemsMenuProvider) => {
                    const dialogRef = _this.dialog.open(InvoicesProductsAddProductsComponent, {
                        width: '500px',
                        data: { packagePath: _package.object.path }
                    });
                }, 'monetization_on', this)
            )
        );
    };

    private getInvoiceItemsMenuAreas = () => {
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

    private getInvoiceItemsMenuItems = (packagePath: string): MenuItem[] => {
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
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            new MenuItem({
                url: '/' + packagePath + '/items/fields',
                displayName: this.translationPrefix + 'FIELDS',
                area: 'manage',
                order: 2,
                icon: 'short_text',
                permissions: [
                    InvoicesPermissions.findInvoiceItemFields
                ],
                providedIn: [SIDEBAR]
            }),
            setBackButton(packagePath)
        ];
    };
};