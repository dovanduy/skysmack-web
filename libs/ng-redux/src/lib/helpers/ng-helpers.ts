import { Router } from '@angular/router';
import { Package, LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { map, shareReplay } from 'rxjs/operators';
import { LoadedPackage } from '../packages/loaded-package';

export const getAdditionalPaths = (router: Router, packagePath): string[] => {
    const chuncks = router.url.split('/');
    const additionalPaths: string[] = [];
    for (let chunck of chuncks) {
        if (chunck === 'edit' || chunck === 'create') {
            break;
        }

        if (chunck !== '' && chunck !== 'fields' && chunck !== 'settings' && chunck !== packagePath) {
            additionalPaths.push(chunck);
        }
    }
    return additionalPaths;
};

/**
 * If the loadedPackage is lodging-reservations-pricings, this function will return the lodging package
 * related to the lodging-reservation package. So:
 * lodging-reservations-pricings -> lodging-reservations -> lodgings
 */
export const getParentPackageDependency = (skysmackStore: NgSkysmackStore, depencendyPath: string): Observable<LocalObject<Package, string>> => {
    return skysmackStore.getPackages().pipe(map(packages => {
        const lodgingReservationPackage = packages.find(_package => _package.object.path === depencendyPath);
        return packages.find(_package => _package.object.path === lodgingReservationPackage.object.dependencies[0]);
    }), shareReplay(1));
}