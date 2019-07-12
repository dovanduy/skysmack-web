import { Injectable, Injector } from '@angular/core';
import { Router, Route } from '@angular/router';
import { hasValue } from '@skysmack/framework';
import { Skysmack } from '@skysmack/packages-skysmack-core';
import { map, take } from 'rxjs/operators';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { PackageLoader } from '@skysmack/ng-framework';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PackageRouteConfiguration {
    /**
     * Getting the router manually via the injector prevents dependency injection error caused by
     * http and router depending on each other.
     * See below for details.
     * https://stackoverflow.com/questions/39767019/app-initializer-raises-cannot-instantiate-cyclic-dependency-applicationref-w/39767492
     */
    public get router(): Router {
        return this.injector.get(Router);
    }

    constructor(
        public store: NgSkysmackStore,
        public injector: Injector
    ) { }

    public configure(): Observable<void> {
        return this.store.getSkysmack()
            .pipe(
                hasValue(),
                map((skysmack: Skysmack) => {
                    skysmack.packages.map(_package => {
                        return PackageLoader.packageManifests.map(routingPath => {
                            if (routingPath.id === _package.type) {
                                this.addRoute(_package.path, routingPath.modulePath);
                            }
                        });
                    });
                }),
            );
    }

    private addRoute(packageUrl: string, modulePath: Function | string) {
        let match = false;
        this.router.config.forEach(route => {
            if (route.path === packageUrl) {
                match = true;
            }
        });
        if (!match) {
            this.router.config.unshift({
                path: packageUrl,
                loadChildren: modulePath
            } as Route);
        }
    }
}

export function configurePackageRouting(packageRouteConfiguration: PackageRouteConfiguration) {
    return () => packageRouteConfiguration.configure();
}
