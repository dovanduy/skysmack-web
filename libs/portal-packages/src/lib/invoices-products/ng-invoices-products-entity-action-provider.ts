import { Injectable } from '@angular/core';
import { EntityAction } from '@skysmack/ng-ui';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { StrIndex, LocalObject } from '@skysmack/framework';
import { EntityActionProvider } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { PRODUCTS_AREA_KEY } from '@skysmack/packages-products';
import { InvoicesProductsType } from '@skysmack/packages-invoices-products';

@Injectable({ providedIn: 'root' })
export class NgInvoicesProductsEntityActionProvider extends EntityActionProvider {

    public register: StrIndex<boolean> = {};

    constructor(
        public skysmackStore: NgSkysmackStore
    ) {
        super();
    }

    public getEntityActions(packagePath: string, area: string, entity?: LocalObject<any, unknown>): Observable<EntityAction[]> {
        if (area === PRODUCTS_AREA_KEY) {
            return this.skysmackStore.getPackages().pipe(
                map(packages => packages.filter(_package => _package.object.type === InvoicesProductsType.id && _package.object.dependencies[1] === packagePath)),
                switchMap(packages => {
                    if (packages && packages.length > 0) {
                        const entityActionStreams$ = packages.map(_package => {
                            return of([
                                new EntityAction().asUrlAction(`/${_package.object.path}`, `Add to invoice via: ${_package.object.name}`, 'monetization_on', 'add-to-invoice')
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
