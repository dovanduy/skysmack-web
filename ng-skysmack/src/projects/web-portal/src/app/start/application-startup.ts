import { APP_INITIALIZER, Injectable } from '@angular/core';
import { NgSkysmackActions } from './../../../../../lib/ng-packages/skysmack/redux/ng-skysmack-actions';
import { SkysmackApiDomain } from '../../requests/skysmack-api-domain';
import { loadPersonPackage } from '../packages/persons-package-manifest';
import { PackageLoader } from 'lib/ng-packages/skysmack/packages/package-loader';
import { MenuItemProvider } from 'lib/portal-ui/providers/menu-item-provider';
import { of } from '@skysmack/framework/node_modules/rxjs';
import { Observable } from 'rxjs';
import { MenuItem } from 'lib/portal-ui/models/sidebar-menu/menu-item';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptor } from 'lib/portal-ui/autentication/authorization.interceptor';
import { loadProductPackage } from '../packages/products-package-manifest';
import { loadLodgingPackage } from '../packages/lodgings-package-manifest';
import { loadOauth2Package } from '../packages/oauth2-package-manifest';
import { configureLanguage } from 'lib/portal-ui/language/configure-language';
import { LanguageService } from 'lib/portal-ui/language/language.service';


// TODO: Delete as soon as one real other menu item provider has been created.
@Injectable({ providedIn: 'root' })
export class TempMenuItemProvider extends MenuItemProvider {
    public menuId = 'temp';
    public icon = 'shortText';

    public getItems(menuId: string, packageId: string): Observable<MenuItem[]> {
        return of([]);
    }
}


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
    { provide: APP_INITIALIZER, useFactory: loadPersonPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadProductPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadLodgingPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadOauth2Package, deps: [PackageLoader], multi: true },
];

export const menuProviders = [
    { provide: MenuItemProvider.TOKEN, useClass: TempMenuItemProvider, multi: true },
    // { provide: MenuItemProvider.TOKEN, useClass: PersonsBasketMenuItemProvider, multi: true },
    // { provide: MenuItemProvider.TOKEN, useClass: LodgingsReservationsMenuItemProvider, multi: true }
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
