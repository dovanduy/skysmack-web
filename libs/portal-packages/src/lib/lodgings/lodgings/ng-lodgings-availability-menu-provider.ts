import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { LodgingsPermissions } from '@skysmack/packages-lodgings';
import { setBackButton } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgLodgingsAvailabilityMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'LODGINGS_AVAILABILITY.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return of([
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ])
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        if(componentKey === 'lodgings-availability-index') {
            return of([
            ]).pipe(setBackButton({ customPath: '/rooms' }));
        } else {
           return of([]);
        }
    };
}