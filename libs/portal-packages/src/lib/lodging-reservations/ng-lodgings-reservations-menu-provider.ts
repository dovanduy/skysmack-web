import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { ReservationsPermissions } from '@skysmack/packages-lodging-reservations';

@Injectable({ providedIn: 'root' })
export class NgLodgingsReservationsMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'LODGING_RESERVATIONS.INDEX.';

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
                area: 'reservations',
                translationPrefix: this.translationPrefix,
                order: 2
            }),
            new MenuArea({
                area: 'settings',
                translationPrefix: this.translationPrefix,
                order: 3
            })
        ])
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        if(componentKey === 'lodgings-reservations-index') {
            return of([
                new MenuItem({
                    url: '/' + packagePath + '/create',
                    displayName: this.translationPrefix + 'CREATE',
                    area: 'actions',
                    order: 1,
                    icon: 'add',
                    permissions: [
                        ReservationsPermissions.addReservations
                    ],
                    providedIn: ['sidebar']
                }),
                new MenuItem({
                    url: '/' + packagePath,
                    displayName: this.translationPrefix + 'ALL',
                    area: 'reservations',
                    order: 1,
                    icon: 'groupAdd',
                    permissions: [
                        ReservationsPermissions.findReservations
                    ],
                    providedIn: ['sidebar']
                }),
                new MenuItem({
                    url: '/' + packagePath + '/arrivals',
                    displayName: this.translationPrefix + 'ARRIVALS',
                    area: 'reservations',
                    order: 2,
                    icon: 'groupAdd',
                    permissions: [
                        ReservationsPermissions.findReservations
                    ],
                    providedIn: ['sidebar']
                }),
                new MenuItem({
                    url: '/' + packagePath + '/stays',
                    displayName: this.translationPrefix + 'STAYS',
                    area: 'reservations',
                    order: 3,
                    icon: 'groupAdd',
                    permissions: [
                        ReservationsPermissions.findReservations
                    ],
                    providedIn: ['sidebar']
                }),
                new MenuItem({
                    url: '/' + packagePath + '/departures',
                    displayName: this.translationPrefix + 'DEPARTURES',
                    area: 'reservations',
                    order: 4,
                    icon: 'groupAdd',
                    permissions: [
                        ReservationsPermissions.findReservations
                    ],
                    providedIn: ['sidebar']
                }),
                new MenuItem({
                    url: '/' + packagePath + '/settings/checkin',
                    displayName: this.translationPrefix + 'SETTINGS',
                    area: 'settings',
                    order: 1,
                    icon: 'groupAdd',
                    permissions: [
                        ReservationsPermissions.checkIn
                    ],
                    providedIn: ['sidebar']
                })
            ]);
        } else {
           return of([]);
        }
    };
}