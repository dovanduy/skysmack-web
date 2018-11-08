import { APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PackageRouteConfiguration, configurePackageRouting } from '../package-route-configuration';
import { NgSkysmackActions } from 'lib/ng-packages/skysmack/redux/ng-skysmack-actions';
import { SkysmackApiDomain } from '../../requests/skysmack-api-domain';

export function configureCurrentTenant(actions: NgSkysmackActions) {
    return () => actions.getCurrentTenant();
}

export const configurations = [
    { provide: APP_INITIALIZER, useFactory: configureCurrentTenant, deps: [NgSkysmackActions], multi: true },
];

export const injectionTokens = [
    { provide: 'ApiDomain', useClass: SkysmackApiDomain }
];

export const applicationStartup = [
    ...configurations,
    ...injectionTokens
];
