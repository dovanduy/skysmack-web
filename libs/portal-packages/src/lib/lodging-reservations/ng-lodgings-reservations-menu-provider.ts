import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { ReservationsPermissions } from '@skysmack/packages-lodging-reservations';
import { getMenuEntries, setConnectedPackage } from '@skysmack/ng-framework';
import { LodgingReservationsTypeId } from '@skysmack/package-types';
import { LodgingsReservationsIndexComponent } from './lodging-reservations/lodgings-reservations-index/lodgings-reservations-index.component';

@Injectable({ providedIn: 'root' })
export class NgLodgingsReservationsMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'LODGING_RESERVATIONS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, LodgingReservationsTypeId, componentKey, LodgingsReservationsIndexComponent.COMPONENT_KEY, this.getLodgingsReservationsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, LodgingReservationsTypeId, componentKey, LodgingsReservationsIndexComponent.COMPONENT_KEY, this.getLodgingsReservationsMenuItems, this.store);
    };

    public getLodgingsReservationsMenuAreas = () => {
        return [
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
            }),
            this.getConnectedPackageMenuArea()
        ];
    };

    public getLodgingsReservationsMenuItems = (packagePath: string) => {
        return [
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
                icon: 'group_add',
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
                icon: 'group_add',
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
                icon: 'group_add',
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
                icon: 'group_add',
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
                icon: 'group_add',
                permissions: [
                    ReservationsPermissions.checkIn
                ],
                providedIn: ['sidebar']
            }),
            setConnectedPackage(this.store, packagePath)
        ];
    };
};