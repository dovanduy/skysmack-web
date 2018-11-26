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


// TODO: Delete as soon as one real other menu item provider has been created.
@Injectable({ providedIn: 'root' })
export class TempMenuItemProvider extends MenuItemProvider {
    public menuId = 'temp';
    public icon = 'shortText';

    public getItems(menuId: string, packageId: string): Observable<MenuItem[]> {
        return of([]);
    }
}


export function configureCurrentTenant(actions: NgSkysmackActions) {
    return () => actions.getCurrentTenant();
}

export const configurations = [
    { provide: APP_INITIALIZER, useFactory: configureCurrentTenant, deps: [NgSkysmackActions], multi: true },
];

export const httpInterceptors = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }
];

export const packageLoaders = [
    { provide: APP_INITIALIZER, useFactory: loadPersonPackage, deps: [PackageLoader], multi: true },
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
