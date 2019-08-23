import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { ReservationsPermissions } from '@skysmack/packages-lodging-reservations';
import { getMenuEntries, getConnectedPackageMenuEntries, getCombinedMenuEntries, setConnectedParentPackage } from '@skysmack/ng-framework';
import { LodgingReservationsTypeId, LodgingsTypeId } from '@skysmack/package-types';
import { LodgingsReservationsIndexComponent } from './lodging-reservations/lodgings-reservations-index/lodgings-reservations-index.component';
import { LodgingsIndexComponent } from '../lodgings';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgLodgingsReservationsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'LODGING_RESERVATIONS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(
            packagePath,
            LodgingReservationsTypeId,
            componentKey,
            LodgingsReservationsIndexComponent.COMPONENT_KEY,
            this.getLodgingsReservationsMenuAreas, this.store
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries(
            getMenuEntries<MenuItem>(packagePath,
                LodgingReservationsTypeId,
                componentKey,
                LodgingsReservationsIndexComponent.COMPONENT_KEY,
                this.getLodgingsReservationsMenuItems,
                this.store
            ),
            getConnectedPackageMenuEntries(
                packagePath,
                LodgingReservationsTypeId,
                LodgingsTypeId,
                componentKey,
                LodgingsIndexComponent.COMPONENT_KEY,
                this.store
            )
        );
    };

    private getLodgingsReservationsMenuAreas = () => {
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
            })
        ];
    };

    private getLodgingsReservationsMenuItems = (packagePath: string) => {
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
                providedIn: [SIDEBAR, SPEEDDIAL]
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
                providedIn: [SIDEBAR]
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
                providedIn: [SIDEBAR]
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
                providedIn: [SIDEBAR]
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
                providedIn: [SIDEBAR]
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
                providedIn: [SIDEBAR]
            }),
            setConnectedParentPackage(this.store, packagePath)
        ];
    };
};