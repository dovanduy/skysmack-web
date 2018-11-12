import { APP_INITIALIZER } from '@angular/core';
import { NgSkysmackActions } from './../../../../../lib/ng-packages/skysmack/redux/ng-skysmack-actions';
import { SkysmackApiDomain } from '../../requests/skysmack-api-domain';
import { loadPersonPackage } from '../packages/persons-package-manifest';
import { PackageLoader } from 'lib/ng-packages/skysmack/packages/package-loader';

export function configureCurrentTenant(actions: NgSkysmackActions) {
    return () => actions.getCurrentTenant();
}

export const configurations = [
    { provide: APP_INITIALIZER, useFactory: configureCurrentTenant, deps: [NgSkysmackActions], multi: true },
];

export const packageLoaders = [
    { provide: APP_INITIALIZER, useFactory: loadPersonPackage, deps: [PackageLoader], multi: true },
];

export const injectionTokens = [
    { provide: 'ApiDomain', useClass: SkysmackApiDomain }
];

export const applicationStartup = [
    ...configurations,
    ...packageLoaders,
    ...injectionTokens
];
