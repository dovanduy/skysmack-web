import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { Injectable, SystemJsNgModuleLoader, Injector, NgModuleFactory } from '@angular/core';
import { switchMap, flatMap } from 'rxjs/operators';
import { NgAuthenticationStore } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class AuthenticatedLoadStrategy implements PreloadingStrategy {
  constructor(
    private loader: SystemJsNgModuleLoader,
    public injector: Injector,
    public authStore: NgAuthenticationStore
  ) { }

  preload(route: Route, load: Function): Observable<any> {
    if (!route.data) {
      route.data = {};
    }

    if (!route.data.loadOnOpen) {
      return this.authStore.isCurrentUserAuthenticated().pipe(
        switchMap(authenticated => {
          if (authenticated) {
            return timer(5).pipe(
              flatMap(_ => {
                route.data.optional = true;
                // Create an instance of all installed packages, to ensure their provided functionality is available.
                this.loader.load(route.loadChildren.toString()).then((moduleFactory: NgModuleFactory<any>) => {
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