import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { setBackButton } from '@skysmack/ng-framework';
import { MaintenancePermissions } from '@skysmack/packages-maintenance';

@Injectable({ providedIn: 'root' })
export class NgRecurringAssignmentsMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'RECURRING_ASSIGNMENTS.INDEX.';

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
        if(componentKey === 'recurring-assignments-index') {
            return of([
                new MenuItem({
                    url: 'create',
                    displayName: this.translationPrefix + 'CREATE',
                    area: 'actions',
                    order: 1,
                    icon: 'add',
                    permissions: [
                    ],
                    providedIn: ['sidebar', 'speedDial']
                })
            ]).pipe(setBackButton({ customPath: '/maintenance' }));
        } else {
           return of([]);
        }
    };
}