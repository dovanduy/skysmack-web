import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { CorsAppState, CORS_REDUCER_KEY } from '@skysmack/packages-cors';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { defined } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgCorsStore {
    protected stateKey: string = CORS_REDUCER_KEY;
    constructor(
        protected ngRedux: NgRedux<CorsAppState>,
        protected skysmackStore: NgSkysmackStore,
    ) { }

    public getDomains(packagePath: string): Observable<string[]> {
        return this.ngRedux.select((state: CorsAppState) => state.cors).pipe(
            map(state => state.domains),
            defined(),
            map(domains => domains[packagePath]),
            defined()
        );
    }
}
