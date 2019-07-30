import { PreloadingStrategy, Route } from '@angular/router';

import { Observable, of, timer } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Injectable, SystemJsNgModuleLoader, Injector, NgModuleFactory } from '@angular/core';
import { map, switchMap, flatMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TenantPackageLoadStrategy implements PreloadingStrategy {
  public static URL_PREFIX = 'skysmack/loadPackages/';

  constructor(public skysmackStore: NgSkysmackStore,    
    private loader: SystemJsNgModuleLoader,
    public injector: Injector) {
  }

  preload(route: Route, load: Function): Observable<any> {
    if (!route.data) {
      route.data = {};
    }

    if (!route.data.loadOnOpen) {
      return this.skysmackStore.getPackages().pipe(
        switchMap(packages => {
          const packagesMatches = packages.filter(p => p.object.access && route.path.endsWith(p.object.type));
          if (packagesMatches.length > 0) {
            return timer(50).pipe(
              flatMap(_ => {
                route.data.optional = true;
                // Create an instance of all installed packages, to ensure their provided functionality is available.
                this.loader.load(route.loadChildren.toString()).then((moduleFactory: NgModuleFactory<any>) => {
                    const moduleRef = moduleFactory.create(this.injector);
                });
                return load();
              }));
          }
          return route.data && route.data.preload ? load() : of(null);
        })
      )
    }
    return of(null);
  }
}