import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { SiteMinderAppState, SiteMinderState, SiteMinderUi } from '@skysmack/packages-siteminder';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { safeUndefinedTo } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderStore {
    constructor(
        protected ngRedux: NgRedux<SiteMinderAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { }

    public getRatesUi(packagePath: string): Observable<boolean> {
        return this.getUiState(packagePath).pipe(
            map(uiState => uiState.rates ? uiState.rates : false),
        );
    }

    public getRestrictionsUi(packagePath: string): Observable<boolean> {
        return this.getUiState(packagePath).pipe(
            map(uiState => uiState.restrictions ? uiState.restrictions : false),
        );
    }

    public getAllUi(packagePath: string): Observable<boolean> {
        return this.getUiState(packagePath).pipe(
            map(uiState => uiState.all ? uiState.all : false),
        );
    }

    public getAvailabilityUi(packagePath: string): Observable<boolean> {
        return this.getUiState(packagePath).pipe(
            map(uiState => uiState.availability ? uiState.availability : false),
        );
    }

    public getChannelsUi(packagePath: string): Observable<number[]> {
        return this.getUiState(packagePath).pipe(
            map(uiState => uiState.channels ? uiState.channels : []),
        );
    }

    public getRatePlansUi(packagePath: string): Observable<number[]> {
        return this.getUiState(packagePath).pipe(
            map(uiState => uiState.ratePlans ? uiState.ratePlans : []),
        );
    }

    public getLodgingTypesUi(packagePath: string): Observable<number[]> {
        return this.getUiState(packagePath).pipe(
            map(uiState => uiState.lodgingTypes ? uiState.lodgingTypes : []),
        );
    }

    private getUiState(packagePath: string): Observable<SiteMinderUi> {
        return this.getState().pipe(
            map(state => state.ui[packagePath]),
            safeUndefinedTo('object')
        );
    }

    private getState(): Observable<SiteMinderState> {
        return this.ngRedux.select((state: SiteMinderAppState) => state.siteMinder);
    }
}
