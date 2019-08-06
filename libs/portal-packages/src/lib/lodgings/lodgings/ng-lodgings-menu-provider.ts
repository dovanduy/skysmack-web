import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { LodgingsPermissions } from '@skysmack/packages-lodgings';

@Injectable({ providedIn: 'root' })
export class NgLodgingsMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'LODGINGS.INDEX.';

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
        if(componentKey === 'lodgings-index') {
            return of([
                new MenuItem({
                    url: 'create',
                    displayName: this.translationPrefix + 'CREATE',
                    area: 'actions',
                    order: 1,
                    icon: 'add',
                    permissions: [
                        LodgingsPermissions.addLodgings
                    ],
                    providedIn: ['sidebar', 'speedDial']
                }),
                new MenuItem({
                    url: 'types',
                    displayName: this.translationPrefix + 'TYPES',
                    area: 'manage',
                    order: 1,
                    icon: 'description',
                    permissions: [
                        LodgingsPermissions.findLodgingTypes
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
                        LodgingsPermissions.findLodgingFields
                    ],
                    providedIn: ['sidebar']
                }),
                new MenuItem({
                    url: '/' + packagePath + '/availability',
                    displayName: this.translationPrefix + 'AVAILABILITY',
                    area: 'manage',
                    order: 3,
                    icon: 'groupAdd',
                    permissions: [
                    ],
                    providedIn: ['sidebar']
                })
            ]);
        } else {
           return of([]);
        }
    };
}