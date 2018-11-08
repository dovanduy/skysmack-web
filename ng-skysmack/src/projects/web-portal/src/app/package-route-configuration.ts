import { Injectable, Injector } from '@angular/core';
import { Router, Route } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { CurrentTenantViewModel } from '@skysmack/packages-skysmack';
import { hasValue } from '@skysmack/framework';
import { DynamicPackageRouter } from '../models/dynamic-package-router';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';

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

    private routingPaths = [
        { type: '38ffd3ad-91a8-44d4-a71a-fd2f478ebd18', path: '../../../../../lib/portal-packages/persons/persons.module#PersonsModule' }
    ];

    private routingModules: DynamicPackageRouter[] = [
        // new PersonRoutingModule,
    ];

    constructor(
        public redux: NgSkysmackRedux,
        public injector: Injector
    ) { }

    public configure() {
        return this.redux.getCurrentTenant()
            .pipe(
                hasValue(),
                map((currentTenant: CurrentTenantViewModel) => {
                    currentTenant.packages.map(_package => {
                        return this.routingPaths.map(routingPath => {
                            if (routingPath.type === _package.type) {
                                this.addRoute(_package.url, routingPath.path);
                            }
                        });
                    });

                    currentTenant.features.map(feature => {
                        return this.routingModules.map(routingModule => {
                            if (routingModule.packageManifest.id === feature.type) {
                                // this.addRoute(feature.url, routingModule.componentPaths);
                            }
                        });
                    });

                    currentTenant.adaptors.map(adaptor => {
                        return this.routingModules.map(routingModule => {
                            if (routingModule.packageManifest.id === adaptor.type) {
                                // this.addRoute(adaptor.url, routingModule.componentPaths);
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
