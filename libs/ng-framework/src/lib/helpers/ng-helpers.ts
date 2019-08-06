import { Router } from '@angular/router';
import { Package, LocalObject, toLocalObject, MenuItem } from '@skysmack/framework';
import { map, switchMap, filter } from 'rxjs/operators';
import { combineLatest, pipe, of, Observable } from 'rxjs';
import { SkysmackStore } from '../stores/skysmack-store';

export const getAdditionalPaths = (router: Router, packagePath): string[] => {
    const chuncks = router.url.split('/');
    const additionalPaths: string[] = [];
    for (let chunck of chuncks) {
        if (chunck === 'edit' || chunck === 'create' || chunck === 'details') {
            break;
        }

        if (chunck !== '' && chunck !== 'fields' && chunck !== 'settings' && chunck !== packagePath) {
            additionalPaths.push(chunck);
        }
    }
    return additionalPaths;
};

/**
 * Recursively travels up the packages dependencies until no more dependency indexes are available, then returns the package.
 * If the dependency index array is empty, the same current package is returned.
 */
export const getNParentPackageDependency = (packages: LocalObject<Package, string>[], currentPackage: Package, dependencyIndexes: number[]): LocalObject<Package, string> => {
    if (dependencyIndexes && dependencyIndexes.length > 0) {
        const currentDepIndex = dependencyIndexes[0];
        const parentPackage = packages.find(_package => _package.object.path === currentPackage.dependencies[currentDepIndex]);
        return getNParentPackageDependency(packages, parentPackage.object, dependencyIndexes.slice(1));
    }
    return toLocalObject(currentPackage);
}

/**
 * Helper to make it easy to get a required package as a stream
 * If the dependency index array is empty, the current package is returned.
 * TODO: Note: This could be refactored into the skysmack store, instead of receiving it as an argument.
 */
export const getPackageDendencyAsStream = (skysmackStore: SkysmackStore, packagePath: string, dependencyIndexes: number[] = []) => {
    return combineLatest(
        skysmackStore.getPackages(),
        skysmackStore.getCurrentPackage(packagePath)
    ).pipe(
        map(([packages, currentPackage]) => getNParentPackageDependency(packages, currentPackage._package, dependencyIndexes)),
    );
}

export const setBackButton = (options?: {
    connectedPackage?: boolean;
    dependencyIndexes?: number[];
    customPath?: string;
}) => pipe(
    switchMap((menuItems: MenuItem[]) => {
        if (!options) {
            menuItems.push(new MenuItem({
                url: '/' + this.packagePath,
                displayName: 'UI.MISC.BACK',
                area: 'manage',
                order: 2,
                icon: 'arrowBack',
                providedIn: ['sidebar']
            }));
            return of(menuItems)
        } else if (options.connectedPackage) {
            return getPackageDendencyAsStream(this.skysmackStore, this.packagePath, options.dependencyIndexes ? options.dependencyIndexes : [0]).pipe(
                map(targetPackage => menuItems.concat([new MenuItem({
                    url: '/' + targetPackage.object.path,
                    displayName: targetPackage.object.name,
                    area: 'connected_packages',
                    order: 2,
                    icon: 'arrowBack',
                    providedIn: ['sidebar']
                })])),
            );
        } else {
            const path = options.customPath ? options.customPath : '/' + this.packagePath;
            menuItems.push(new MenuItem({
                url: path,
                displayName: 'UI.MISC.BACK',
                area: 'manage',
                order: 2,
                icon: 'arrowBack',
                providedIn: ['sidebar']
            }));
            return of(menuItems);
        }  
    })
);

/**
 * Helper to get MenuAreas or MenuItems if conditions are met.
 */
export const getMenuEntries = <T>(packagePath: string, packageTypeId: string, componentKey: string, specificComponentKey: string, items: T[], store: SkysmackStore): Observable<T[]> => {
    if(componentKey === specificComponentKey) {
        return store.getCurrentPackage(packagePath).pipe(
            filter(_package => _package._package.type === packageTypeId),
            map(() => items)
        );
    } else {
       return of([]);
    }
};