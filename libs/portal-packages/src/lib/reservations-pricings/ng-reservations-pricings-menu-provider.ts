import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { ReservationsPricingsPermissions } from '@skysmack/packages-reservations-pricings';
import { getMenuEntries, setConnectedParentPackage, getCombinedMenuEntries, getConnectedPackageMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { ReservationsPricingsTypeId, LodgingReservationsTypeId } from '@skysmack/package-types';
import { ReservationsPricingsIndexComponent } from './components/reservations-pricings-index/reservations-pricings-index.component';
import { LodgingsReservationsIndexComponent } from '../lodging-reservations/lodging-reservations/lodgings-reservations-index/lodgings-reservations-index.component';
import { LodgingPricesIndexComponent } from './lodging-prices/components/lodging-prices-index/lodging-prices-index.component';
import { LodgingReservationPriceChangesIndexComponent } from './lodging-reservation-price-changes/components/lodging-reservation-price-changes-index/lodging-reservation-price-changes-index.component';
import { LodgingTypePricesIndexComponent } from './lodging-type-prices/components/lodging-type-prices-index/lodging-type-prices-index.component';
import { LodgingTypeReservationPriceChangesIndexComponent } from './lodging-type-reservation-price-changes/components/lodging-type-reservation-price-changes-index/lodging-type-reservation-price-changes-index.component';

@Injectable({ providedIn: 'root' })
export class NgReservationsPricingsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public ReservationsPricingsTranslationPrefix = 'RESERVATIONS_PRICINGS.INDEX.';
    public LodgingsPricesTranslationPrefix = 'LODGING_PRICES.INDEX.';
    public LodgingReservationPriceChangesTranslationPrefix = 'LODGING_RESERVATION_PRICE_CHANGES.INDEX.';
    public LodgingTypePricesTranslationPrefix = 'LODGING_TYPE_PRICES.INDEX.';
    public LodgingTypeReservationPriceChangesranslationPrefix = 'LODGING_TYPE_RESERVATION_PRICE_CHANGES.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(packagePath, ReservationsPricingsTypeId, componentKey, ReservationsPricingsIndexComponent.COMPONENT_KEY, this.getReservationsPricingsMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, ReservationsPricingsTypeId, componentKey, LodgingPricesIndexComponent.COMPONENT_KEY, this.getLodgingPricesMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, ReservationsPricingsTypeId, componentKey, LodgingReservationPriceChangesIndexComponent.COMPONENT_KEY, this.getLodgingReservationPriceChangesMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, ReservationsPricingsTypeId, componentKey, LodgingTypePricesIndexComponent.COMPONENT_KEY, this.getLodgingTypePricesMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, ReservationsPricingsTypeId, componentKey, LodgingTypeReservationPriceChangesIndexComponent.COMPONENT_KEY, this.getLodgingTypeReservationPriceChangesMenuAreas, this.store)
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries(
            getMenuEntries<MenuItem>(packagePath, ReservationsPricingsTypeId, componentKey, ReservationsPricingsIndexComponent.COMPONENT_KEY, this.getReservationsPricingsMenuItems, this.store),
            getConnectedPackageMenuEntries(packagePath, ReservationsPricingsTypeId, LodgingReservationsTypeId, componentKey, LodgingsReservationsIndexComponent.COMPONENT_KEY, this.store),
            getMenuEntries<MenuItem>(packagePath, ReservationsPricingsTypeId, componentKey, LodgingPricesIndexComponent.COMPONENT_KEY, this.getLodgingPricesMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, ReservationsPricingsTypeId, componentKey, LodgingReservationPriceChangesIndexComponent.COMPONENT_KEY, this.getLodgingReservationPriceChangesMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, ReservationsPricingsTypeId, componentKey, LodgingTypePricesIndexComponent.COMPONENT_KEY, this.getLodgingTypePricesMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, ReservationsPricingsTypeId, componentKey, LodgingTypeReservationPriceChangesIndexComponent.COMPONENT_KEY, this.getLodgingTypeReservationPriceChangesMenuItems, this.store)
        );
    };

    private getReservationsPricingsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.ReservationsPricingsTranslationPrefix,
                order: 1
            })
        ];
    };

    private getLodgingPricesMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.LodgingsPricesTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.LodgingsPricesTranslationPrefix,
                order: 2
            })
        ];
    };

    private getLodgingReservationPriceChangesMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.LodgingReservationPriceChangesTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.LodgingReservationPriceChangesTranslationPrefix,
                order: 2
            })
        ];
    };

    private getLodgingTypePricesMenuAreas  = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.LodgingTypePricesTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.LodgingTypePricesTranslationPrefix,
                order: 2
            })
        ];
    };

    private getLodgingTypeReservationPriceChangesMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.LodgingTypeReservationPriceChangesranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.LodgingTypeReservationPriceChangesranslationPrefix,
                order: 2
            })
        ];
    };

    private getReservationsPricingsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'reservation-price-changes',
                displayName: this.ReservationsPricingsTranslationPrefix + 'RESERVATION_PRICE_CHANGES',
                area: 'manage',
                order: 1,
                icon: 'group_add',
                permissions: [
                    ReservationsPricingsPermissions.findLodgingPriceChanges
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'prices',
                displayName: this.ReservationsPricingsTranslationPrefix + 'PRICES',
                area: 'manage',
                order: 2,
                icon: 'group_add',
                permissions: [
                    ReservationsPricingsPermissions.findLodgingPriceChanges
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'types/reservation-price-changes',
                displayName: this.ReservationsPricingsTranslationPrefix + 'RESERVATION_PRICE_CHANGES_TYPES',
                area: 'manage',
                order: 3,
                icon: 'group_add',
                permissions: [
                    ReservationsPricingsPermissions.findLodgingPriceChanges
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'types/prices',
                displayName: this.ReservationsPricingsTranslationPrefix + 'PRICES_TYPES',
                area: 'manage',
                order: 4,
                icon: 'group_add',
                permissions: [
                    ReservationsPricingsPermissions.findLodgingTypePriceChanges
                ],
                providedIn: [SIDEBAR]
            }),
            setConnectedParentPackage(this.store, packagePath)
        ];
    };

    private getLodgingPricesMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.LodgingsPricesTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };

    private getLodgingReservationPriceChangesMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.LodgingReservationPriceChangesTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    ReservationsPricingsPermissions.addLodgingPriceChanges
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };

    private getLodgingTypePricesMenuItems  = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.LodgingTypePricesTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };

    private getLodgingTypeReservationPriceChangesMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.LodgingTypeReservationPriceChangesranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    ReservationsPricingsPermissions.addLodgingTypePriceChanges
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };
}