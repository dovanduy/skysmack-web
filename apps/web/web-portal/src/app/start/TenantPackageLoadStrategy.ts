import { PreloadingStrategy, Route } from '@angular/router';

import { Observable, of } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

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
          return load();
        }
        return route.data && route.data.preload ? load() : of(null);
      })
    )
  }
}