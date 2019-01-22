import { APP_INITIALIZER } from '@angular/core';
import { SkysmackApiDomain } from '../../requests/skysmack-api-domain';
import { loadPersonPackage } from '../packages/persons-package-manifest';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { loadProductPackage } from '../packages/products-package-manifest';
import { loadLodgingPackage } from '../packages/lodgings-package-manifest';
import { loadOauth2Package } from '../packages/oauth2-package-manifest';
import { NgSkysmackActions, PackageLoader, NgLodgingsReservationsMenuItemProvider } from '@skysmack/ng-packages';
import { AuthorizationInterceptor, configureLanguage, LanguageService } from '@skysmack/portal-ui';
import { loadMaintenancePackage } from '../packages/maintenance-package-manifest';
import { loadIdentitiesPackage } from '../packages/identities-package-manifest';
import { loadLodgingReservationPackage } from '../packages/lodging-reservations-package-manifest';
import { MenuItemProvider } from '@skysmack/ng-ui';
import { loadTerminalPaymentsPackage } from '../packages/terminal-payments-manifest';

export function configureSkysmack(actions: NgSkysmackActions) {
    return () => actions.getSkysmack();
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
    { provide: APP_INITIALIZER, useFactory: loadPersonPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadProductPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadLodgingPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadLodgingReservationPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadOauth2Package, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadMaintenancePackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadTerminalPaymentsPackage, deps: [PackageLoader], multi: true }
];

export const menuProviders = [
    { provide: MenuItemProvider.TOKEN, useClass: NgLodgingsReservationsMenuItemProvider, multi: true }
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
