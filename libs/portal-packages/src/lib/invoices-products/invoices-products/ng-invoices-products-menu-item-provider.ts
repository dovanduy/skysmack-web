import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { safeHasValue, Package, MenuItemProvider, MenuItem } from '@skysmack/framework';
import { map, take } from 'rxjs/operators';
import { Skysmack } from '@skysmack/packages-skysmack-core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { InvoicesProductsType } from '@skysmack/packages-invoices-products';
import { MatDialog } from '@angular/material/dialog';
import { InvoicesProductsAddProductsComponent } from './components/invoices-products-add-products/invoices-products-add-products.component';

@Injectable({ providedIn: 'root' })
export class NgInvoicesProductsMenuItemProvider extends MenuItemProvider {
    public menuId = 'invoice-items';
    public icon = 'add';

    constructor(
        public store: NgSkysmackStore,
        public dialog: MatDialog
    ) { super(); }

    public getItems(menuId: string, packagePath: string): Observable<MenuItem[]> {
        if (this.menuId === menuId) {
            return this.store.getSkysmack().pipe(
                safeHasValue(),
                map((currentTenant: Skysmack) => currentTenant.packages
                    .filter((_package: Package) => _package.type === InvoicesProductsType.id && _package.dependencies.find(dep => dep === packagePath))
                    .map(_package =>
                        new MenuItem({ provideIn: 'both', area: 'actions' }).asEventAction(`${_package.name}`, (_this: NgInvoicesProductsMenuItemProvider) => {
                            const dialogRef = _this.dialog.open(InvoicesProductsAddProductsComponent, {
                                width: '500px',
                                data: { packagePath: _package.path }
                            });

                            dialogRef.afterClosed().pipe(take(1)).subscribe(() => { });
                        }, 'monetization_on', this)
                    )
                )
            );
        } else {
            return of([]);
        }
    }
}
