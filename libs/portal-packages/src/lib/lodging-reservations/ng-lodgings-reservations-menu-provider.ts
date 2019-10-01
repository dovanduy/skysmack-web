import { Injectable } from '@angular/core';

import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';

import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { ReservationsPermissions } from '@skysmack/packages-lodging-reservations';
import { LodgingReservationsTypeId, LodgingsTypeId } from '@skysmack/package-types';
import { getMenuEntries, getConnectedPackageMenuEntries, getCombinedMenuEntries, setConnectedParentPackage, setBackButton } from '@skysmack/ng-framework';

import { LodgingsReservationsIndexComponent } from './lodging-reservations/lodgings-reservations-index/lodgings-reservations-index.component';
import { GroupReservationsIndexComponent } from './group-reservations/components/group-reservations-index/group-reservations-index.component';
import { LodgingsIndexComponent } from '../lodgings/lodgings/components/lodgings-index/lodgings-index.component';

@Injectable({ providedIn: 'root' })
export class NgLodgingsReservationsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private lodgingReservationsTranslationPrefix = 'LODGING_RESERVATIONS.INDEX.';
    private groupReservationTranslationPrefix = 'GROUP_RESERVATIONS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(packagePath, LodgingReservationsTypeId, componentKey, LodgingsReservationsIndexComponent.COMPONENT_KEY, this.getLodgingsReservationsMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, LodgingReservationsTypeId, componentKey, GroupReservationsIndexComponent.COMPONENT_KEY, this.getGroupReservationsMenuAreas, this.store)
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries(
            getMenuEntries<MenuItem>(
                packagePath,
                LodgingReservationsTypeId,
                componentKey,
                LodgingsReservationsIndexComponent.COMPONENT_KEY,
                this.getLodgingsReservationsMenuItems,
                this.store
            ),
            getMenuEntries<MenuItem>(
                packagePath,
                LodgingReservationsTypeId,
                componentKey,
                GroupReservationsIndexComponent.COMPONENT_KEY,
                this.getGroupReservationsMenuItems,
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
                translationPrefix: this.lodgingReservationsTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'reservations',
                translationPrefix: this.lodgingReservationsTranslationPrefix,
                order: 2
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.lodgingReservationsTranslationPrefix,
                order: 3
            })
        ];
    };

    private getGroupReservationsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.groupReservationTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.groupReservationTranslationPrefix,
                order: 2
            })
        ];
    };

    private getLodgingsReservationsMenuItems = (packagePath: string) => {
        return [
            new MenuItem({
                url: '/' + packagePath + '/create',
                displayName: this.lodgingReservationsTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    ReservationsPermissions.addReservations
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            new MenuItem({
                url: 'fields',
                displayName: this.lodgingReservationsTranslationPrefix + 'FIELDS',
                area: 'manage',
                order: 2,
                icon: 'short_text',
                permissions: [
                    ReservationsPermissions.findReservationsFields
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: '/' + packagePath,
                displayName: this.lodgingReservationsTranslationPrefix + 'ALL',
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
                displayName: this.lodgingReservationsTranslationPrefix + 'ARRIVALS',
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
                displayName: this.lodgingReservationsTranslationPrefix + 'STAYS',
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
                displayName: this.lodgingReservationsTranslationPrefix + 'DEPARTURES',
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
                displayName: this.lodgingReservationsTranslationPrefix + 'SETTINGS',
                area: 'manage',
                order: 1,
                icon: 'group_add',
                permissions: [
                    ReservationsPermissions.checkIn
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: '/' + packagePath + '/groups',
                displayName: this.lodgingReservationsTranslationPrefix + 'GROUP_RESERVATIONS',
                area: 'manage',
                order: 1,
                icon: 'group_add',
                permissions: [
                    ReservationsPermissions.findGroupReservations
                ],
                providedIn: [SIDEBAR]
            }),
            setConnectedParentPackage(this.store, packagePath)
        ];
    };

    private getGroupReservationsMenuItems = (packagePath: string) => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.groupReservationTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    ReservationsPermissions.addGroupReservations
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            new MenuItem({
                url: 'fields',
                displayName: this.groupReservationTranslationPrefix + 'FIELDS',
                area: 'manage',
                order: 1,
                icon: 'short_text',
                permissions: [
                    ReservationsPermissions.findGroupReservationsFields
                ],
                providedIn: [SIDEBAR]
            }),
            setBackButton(packagePath)
        ];
    };
};