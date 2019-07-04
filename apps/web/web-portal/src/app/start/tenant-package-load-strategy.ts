import { PreloadingStrategy, Route } from '@angular/router';

import { Observable, of, timer } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { Injectable } from '@angular/core';
import { map, switchMap, flatMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TenantPackageLoadStrategy implements PreloadingStrategy {
  public static URL_PREFIX = 'skysmack/loadPackages/';

  constructor(public skysmackStore: NgSkysmackStore) {
  }

  preload(route: Route, load: Function): Observable<any> {
    return this.skysmackStore.getPackages().pipe(
      switchMap(packages => {
        const packagesMatches = packages.filter(p => p.object.access && route.path.endsWith(p.object.type));
        if (packagesMatches.length > 0) {
          return timer(100).pipe(
            flatMap(_ => { 
              return load();
            }));
        }
        return route.data && route.data.preload ? load() : of(null);
      })
    )
  }
}