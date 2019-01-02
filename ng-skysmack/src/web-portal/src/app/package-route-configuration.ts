import { Injectable, Injector } from '@angular/core';
import { Router, Route } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Skysmack } from '@skysmack/packages-skysmack-core';
import { hasValue } from '@skysmack/framework';
import { DynamicPackageRouter } from '../models/dynamic-package-router';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { PackageLoader } from '@skysmack/ng-packages';

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

    private routingModules: DynamicPackageRouter[] = [
        // new PersonRoutingModule,
    ];

    constructor(
        public store: NgSkysmackStore,
        public injector: Injector
    ) { }

    public configure() {
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
                take(1)
            ).subscribe();
    }

    private addRoute(packageUrl: string, modulePath: string) {
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
