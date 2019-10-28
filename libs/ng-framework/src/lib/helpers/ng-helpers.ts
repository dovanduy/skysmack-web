import { Router, RoutesRecognized } from '@angular/router';
import { Package, LocalObject, toLocalObject, MenuItem, SIDEBAR } from '@skysmack/framework';
import { map, switchMap, filter, take, pairwise } from 'rxjs/operators';
import { combineLatest, of, Observable, merge, BehaviorSubject } from 'rxjs';
import { SkysmackStore } from '../stores/skysmack-store';
import { Skysmack } from '@skysmack/packages-skysmack-core';

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

/**
 * Returns a menu item that will navigate to the target package when clicked.
 * Note:
 * - Currently it is always set to the sidebar.
 * - Requires the MenuArea "connected_packages" to be shown
 */
export const setConnectedParentPackage = (store: SkysmackStore, packagePath: string, dependencyIndexes: number[] = [0]): MenuItem => {
    const skysmack = (store.ngRedux.getState().skysmack.skysmack as Skysmack);
    const packages = skysmack.packages.map(_package => toLocalObject<Package, string>(_package, 'path'));
    const currentPackage = packages.find(pck => pck.object.path === packagePath);
    const connectedPackage = getNParentPackageDependency(packages, currentPackage.object, dependencyIndexes);

    return new MenuItem({
        url: '/' + connectedPackage.object.path,
        displayName: connectedPackage.object.name,
        area: 'connected_packages',
        order: 2,
        icon: 'arrowBack',
        providedIn: [SIDEBAR]
    });
};

export const setBackButton = (path: string): MenuItem => {
    return new MenuItem({
        url: '/' + path,
        displayName: 'UI.MISC.BACK',
        area: 'manage',
        order: 2,
        icon: 'arrowBack',
        providedIn: [SIDEBAR]
    });
}

/**
 * Helper to get MenuAreas or MenuItems if conditions are met.
 */
export const getMenuEntries = <T>(packagePath: string, packageTypeId: string, componentKey: string, specificComponentKey: string, items: (packagePath: string) => T[], store: SkysmackStore): Observable<T[]> => {
    if (componentKey === specificComponentKey) {
        return store.getCurrentPackage(packagePath).pipe(
            filter(_package => _package._package.type === packageTypeId),
            map(() => items(packagePath))
        );
    } else {
        return of([]);
    }
};

/**
 * Helper to get menu items pr. connected package. E.g. if Lodgings has 3 LodgingReservations installed, 3 menu items will be returned.
 * Note: Use it in the feature/adaptor providing the items.
 * @param packagePath The current package path
 * @param packageTypeId E.g. LodgingReservationsTypeId
 * @param parentPageTypeId E.g. LodgingsTypeId
 * @param componentKey The one being provided from the current index component
 * @param specificParentPackageComponentKey E.g. LodgingReservations must provide the component key from LodgingsIndexComponent
 * @param store The SkysmackStore
 */
export const getConnectedPackageMenuEntries = (packagePath: string, packageTypeId: string, parentPageTypeId: string, componentKey: string, specificParentPackageComponentKey: string, store: SkysmackStore): Observable<MenuItem[]> => {
    if (componentKey === specificParentPackageComponentKey) {
        return store.getCurrentPackage(packagePath).pipe(
            filter(_package => _package._package.type === parentPageTypeId),
            switchMap(() => store.getPackages().pipe(
                map(_packages => _packages
                    .filter(_package => _package.object.type === packageTypeId)
                    .map(_package => new MenuItem({
                        url: '/' + _package.object.path,
                        displayName: _package.object.name,
                        area: 'connected_packages',
                        order: 1,
                        icon: 'add',
                        permissions: [],
                        providedIn: [SIDEBAR]
                    }))
                )
            ))
        );
    } else {
        return of([]);
    }
};

/**
 * Helper to get custom menu items pr. connected package. E.g. if Lodgings has 3 LodgingReservations installed, 3 menu items will be returned.
 * Note: Use it in the feature/adaptor providing the items.
 * @param packagePath The current package path
 * @param packageTypeId E.g. LodgingReservationsTypeId
 * @param parentPageTypeId E.g. LodgingsTypeId
 * @param componentKey The one being provided from the current index component
 * @param specificParentPackageComponentKey E.g. LodgingReservations must provide the component key from LodgingsIndexComponent
 * @param store The SkysmackStore
 * @param customMenuItem A method the desired menu item pr. package
 */
export const getConnectedPackageCustomMenuEntries = (packagePath: string, packageTypeId: string, parentPageTypeId: string, componentKey: string, specificParentPackageComponentKey: string, store: SkysmackStore, customMenuItem: (_package: LocalObject<Package, string>) => MenuItem): Observable<MenuItem[]> => {
    if (componentKey === specificParentPackageComponentKey) {
        return store.getCurrentPackage(packagePath).pipe(
            filter(_package => _package._package.type === parentPageTypeId),
            switchMap(() => store.getPackages().pipe(
                map(_packages => _packages
                    .filter(_package => _package.object.type === packageTypeId)
                    .map(_package => customMenuItem(_package))
                )
            ))
        );
    } else {
        return of([]);
    }
};

export const getCombinedMenuEntries = <T>(...args: Observable<T[]>[]): Observable<T[]> => {
    return combineLatest(
        args
    ).pipe(map(menuEntriesArrays => menuEntriesArrays.reduce((a, b) => a.concat(b), [])));
};

/**
 * Returns the previous route. Alway returns null as the first value.
 */
export const getPreviousUrl$ = (router: Router): Observable<string> => {
    const null$ = of(null).pipe(take(1));

    const redirects$ = router.events.pipe(
        filter(e => e instanceof RoutesRecognized),
        pairwise(),
        map(event => {
            if (event && event[0] && (event[0] as RoutesRecognized).urlAfterRedirects) {
                return (event[0] as RoutesRecognized).urlAfterRedirects;
            } else {
                return null;
            }
        }),
    );

    return merge(null$, redirects$);
}

/**
 * Convert an observable to a behaviorSubject
 */
export const convertObservableToBehaviorSubject = <T>(observable: Observable<T>, initValue: T): BehaviorSubject<T> => {
    const subject = new BehaviorSubject(initValue);

    observable.subscribe({
        complete: () => subject.complete(),
        error: x => subject.error(x),
        next: x => subject.next(x)
    });

    return subject;
}