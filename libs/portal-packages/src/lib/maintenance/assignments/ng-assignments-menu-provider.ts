import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { MaintenancePermissions } from '@skysmack/packages-maintenance';
import { setBackButton } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'ASSIGNMENTS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return of([
            new MenuArea({
                area: 'actions',
                translationPrefix: this.translationPrefix,
                order: 1,
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ])
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        if(componentKey === 'assignments-index') {
            return of([
                new MenuItem({
                    url: 'create',
                    displayName: this.translationPrefix + 'CREATE',
                    area: 'actions',
                    order: 1,
                    icon: 'add',
                    permissions: [
                        MaintenancePermissions.addAssignments
                    ],
                    providedIn: ['sidebar', 'speedDial']
                }),
                new MenuItem({
                    url: 'types',
                    displayName: this.translationPrefix + 'TYPES',
                    area: 'manage',
                    order: 2,
                    icon: 'description',
                    permissions: [
                    ],
                    providedIn: ['sidebar']
                }),
                new MenuItem({
                    url: 'maintenance-states',
                    displayName: this.translationPrefix + 'STATES',
                    area: 'manage',
                    order: 1,
                    icon: 'shortText',
                    permissions: [
                    ],
                    providedIn: ['sidebar']
                })
            ]).pipe(setBackButton({ customPath: '/maintenance' }));
        } else {
           return of([]);
        }
    };
}