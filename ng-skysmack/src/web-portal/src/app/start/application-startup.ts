import { APP_INITIALIZER, Injectable } from '@angular/core';
import { SkysmackApiDomain } from '../../requests/skysmack-api-domain';
import { loadPersonPackage } from '../packages/persons-package-manifest';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { loadProductPackage } from '../packages/products-package-manifest';
import { loadLodgingPackage } from '../packages/lodgings-package-manifest';
import { loadOauth2Package } from '../packages/oauth2-package-manifest';
import { NgSkysmackActions, PackageLoader, NgLodgingsReservationsMenuItemProvider, NgSkysmackStore } from '@skysmack/ng-packages';
import { AuthorizationInterceptor, configureLanguage, LanguageService } from '@skysmack/portal-ui';
import { loadMaintenancePackage } from '../packages/maintenance-package-manifest';
import { loadIdentitiesPackage } from '../packages/identities-package-manifest';
import { loadLodgingReservationPackage } from '../packages/lodging-reservations-package-manifest';
import { MenuItemProvider, MenuItem } from '@skysmack/ng-ui';
import { loadTerminalPaymentsPackage } from '../packages/terminal-payments-manifest';
import { loadBasketPackage } from '../packages/baskets-package-manifest';
import { loadInvoicePackage } from '../packages/invoices-package-manifest';
import { Observable, of } from 'rxjs';

export function configureSkysmack(actions: NgSkysmackActions) {
    return () => actions.getSkysmack();
}

export class InitialMenuItemProvider extends MenuItemProvider {
    public menuId = '';
    public icon = '';
    constructor() { super(); }
    public getItems = (menuId: string, packagePath: string): Observable<MenuItem[]> => of([]);
}

export const configurations = [
    { provide: APP_INITIALIZER, useFactory: configureSkysmack, deps: [NgSkysmackActions], multi: true },
    { provide: APP_INITIALIZER, useFactory: configureLanguage, deps: [LanguageService], multi: true }
];

export const httpInterceptors = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }
];

export const packageLoaders = [
    { provide: APP_INITIALIZER, useFactory: loadIdentitiesPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadBasketPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadInvoicePackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadPersonPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadProductPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadLodgingPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadLodgingReservationPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadOauth2Package, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadMaintenancePackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadTerminalPaymentsPackage, deps: [PackageLoader], multi: true }
];

export const menuProviders = [
    { provide: MenuItemProvider.TOKEN, useClass: InitialMenuItemProvider, multi: true }
];

export const injectionTokens = [
    { provide: 'ApiDomain', useClass: SkysmackApiDomain }
];

export const applicationStartup = [
    ...configurations,
    ...httpInterceptors,
    ...packageLoaders,
    ...menuProviders,
    ...injectionTokens
];
