import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR, Package, LocalObject } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, getCombinedMenuEntries, getConnectedPackageCustomMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { InvoicesPermissions } from '@skysmack/packages-invoices';
import { InvoicesTypeId, InvoicesProductsTypeId } from '@skysmack/package-types';
import { InvoicesIndexComponent } from './components/invoices-index/invoices-index.component';
import { InvoiceItemsIndexComponent } from '../invoice-item/components/invoice-items-index/invoice-items-index.component';
import { NgInvoiceItemsMenuProvider } from '../invoice-item/ng-invoice-items-menu-provider';
import { InvoicesProductsAddProductsComponent } from '../../invoices-products/invoices-products/components/invoices-products-add-products/invoices-products-add-products.component';
import { InvoicePaymentsIndexComponent } from '../invoice-payment/components/invoice-payments-index/invoice-payments-index.component';

@Injectable({ providedIn: 'root' })
export class NgInvoicesMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public InvoicesTranslationPrefix = 'INVOICES.INDEX.';
    public InvoiceItemsTranslationPrefix = 'INVOICE_ITEMS.INDEX.';
    public InvoicePaymentsTranslationPrefix = 'INVOICE_PAYMENTS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(packagePath, InvoicesTypeId, componentKey, InvoicesIndexComponent.COMPONENT_KEY, this.getInvoicesMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, InvoicesTypeId, componentKey, InvoiceItemsIndexComponent.COMPONENT_KEY, this.getInvoiceItemsMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, InvoicesTypeId, componentKey, InvoicePaymentsIndexComponent.COMPONENT_KEY, this.getInvoicePaymentsMenuAreas, this.store)
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
            getMenuEntries<MenuItem>(packagePath, InvoicesTypeId, componentKey, InvoicesIndexComponent.COMPONENT_KEY, this.getInvoicesMenuItems, this.store),
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
            ),
            getMenuEntries<MenuItem>(packagePath, InvoicesTypeId, componentKey, InvoicePaymentsIndexComponent.COMPONENT_KEY, this.getInvoicePaymentsMenuItems, this.store)
        );
    };

    private getInvoicesMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.InvoicesTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.InvoicesTranslationPrefix,
                order: 2
            })
        ];
    };

    private getInvoiceItemsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.InvoiceItemsTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.InvoiceItemsTranslationPrefix,
                order: 2
            })
        ];
    }

    private getInvoicePaymentsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.InvoicePaymentsTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.InvoicePaymentsTranslationPrefix,
                order: 2
            })
        ];
    };

    private getInvoicesMenuItems = () => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.InvoicesTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    InvoicesPermissions.addInvoiceItems
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            new MenuItem({
                url: 'fields',
                displayName: this.InvoicesTranslationPrefix + 'FIELDS',
                area: 'manage',
                order: 2,
                icon: 'short_text',
                permissions: [
                    InvoicesPermissions.findInvoiceItemFields
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'payments',
                displayName: this.InvoicesTranslationPrefix + 'PAYMENTS',
                area: 'manage',
                order: 3,
                icon: 'short_text',
                permissions: [
                    InvoicesPermissions.findInvoiceItemFields
                ],
                providedIn: [SIDEBAR]
            })
        ];
    };

    private getInvoiceItemsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.InvoiceItemsTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    InvoicesPermissions.addInvoiceItems
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            new MenuItem({
                url: 'fields',
                displayName: this.InvoiceItemsTranslationPrefix + 'FIELDS',
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

    private getInvoicePaymentsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.InvoicePaymentsTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    InvoicesPermissions.addInvoicePayments
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            new MenuItem({
                url: 'fields',
                displayName: this.InvoicePaymentsTranslationPrefix + 'FIELDS',
                area: 'manage',
                order: 2,
                icon: 'short_text',
                permissions: [
                    InvoicesPermissions.findInvoicePaymentFields
                ],
                providedIn: [SIDEBAR]
            }),
            setBackButton(packagePath)
        ];
    };
}