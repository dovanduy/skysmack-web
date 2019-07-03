import { Injectable } from '@angular/core';
import { MenuItem } from '@skysmack/framework';
import { map, switchMap, take } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { StrIndex, LocalObject } from '@skysmack/framework';
import { MenuItemActionProvider } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { PRODUCTS_AREA_KEY, Product } from '@skysmack/packages-products';
import { InvoicesProductsType } from '@skysmack/packages-invoices-products';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InvoicesProductsAddComponent } from './invoices-products';

@Injectable({ providedIn: 'root' })
export class NgInvoicesProductsMenuItemActionProvider extends MenuItemActionProvider {

    public register: StrIndex<boolean> = {};

    constructor(
        public skysmackStore: NgSkysmackStore,
        public router: Router,
        public dialog: MatDialog
    ) {
        super();
    }

    public getMenuItemActions(packagePath: string, area: string, entity?: LocalObject<any, unknown>): Observable<MenuItem[]> {
        if (area === PRODUCTS_AREA_KEY) {
            return this.skysmackStore.getPackages().pipe(
                map(packages => packages.filter(_package => _package.object.type === InvoicesProductsType.id && _package.object.dependencies[1] === packagePath)),
                switchMap(packages => {
                    if (packages && packages.length > 0) {
                        const entityActionStreams$ = packages.map(_package => {
                            return of([
                                new MenuItem().asEventAction(`Add to invoice via: ${_package.object.name}`, (_this: NgInvoicesProductsMenuItemActionProvider, value: LocalObject<Product, Number>) => {
                                    const dialogRef = _this.dialog.open(InvoicesProductsAddComponent, {
                                        width: '500px',
                                        data: { packagePath: _package.object.path, value }
                                    });

                                    dialogRef.afterClosed().pipe(take(1)).subscribe(() => console.log('The dialog was closed'));
                                }, 'monetization_on', this)
                            ]);
                        });
                        return combineLatest(entityActionStreams$);
                    } else {
                        return of([]);
                    }
                }),
                map(values => values.reduce((acc, cur) => acc.concat(cur), []).filter(x => x))
            );
        } else {
            return of([]);
        }
    }
}
