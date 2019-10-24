import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { SiteMinderChannelManagerAppState, LodgingTypeAvailability, LodgingTypeAvailabilityKey, SiteMinderChannelManagerState, LodgingTypeRate, LodgingTypeRateKey } from '@skysmack/packages-siteminder';
import { LocalObject, safeUndefinedTo, dictionaryToArray } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderChannelManagerStore {
    constructor(
        protected ngRedux: NgRedux<SiteMinderChannelManagerAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { }

    public getAvailability(packagePath: string, start: Date, end: Date): Observable<LocalObject<LodgingTypeAvailability, LodgingTypeAvailabilityKey>[]> {
        return this.getState().pipe(
            map(state => state.availability[packagePath]),
            safeUndefinedTo('object'),
            map(availability => availability[`${start}:${end}`]),
            safeUndefinedTo('object'),
            dictionaryToArray()
        );
    }

    public getRates(packagePath: string, start: Date, end: Date): Observable<LocalObject<LodgingTypeRate, LodgingTypeRateKey>[]> {
        return this.getState().pipe(
            map(state => state.rates[packagePath]),
            safeUndefinedTo('object'),
            map(rates => rates[`${start}:${end}`]),
            safeUndefinedTo('object'),
            dictionaryToArray()
        );
    }

    private getState(): Observable<SiteMinderChannelManagerState> {
        return this.ngRedux.select((state: SiteMinderChannelManagerAppState) => state.siteMinderChannelManager);
    }
}
