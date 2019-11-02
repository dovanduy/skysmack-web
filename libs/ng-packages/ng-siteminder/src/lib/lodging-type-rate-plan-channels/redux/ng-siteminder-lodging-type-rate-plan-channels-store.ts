import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingTypeRatePlanChannel, SiteMinderLodgingTypeRatePlanChannelsAppState, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_REDUCER_KEY, LodgingTypeRatePlanChannelKey } from '@skysmack/packages-siteminder';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DependencyOptions, LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderLodgingTypeRatePlanChannelsStore extends NgRecordStore<SiteMinderLodgingTypeRatePlanChannelsAppState, LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey> {
    private deps = [
        new DependencyOptions({
            relationSelector: 'lodgingType',
            relationIdSelector: 'lodgingTypeId',
            stateSelector: 'lodgingTypes',
            dependencyIndexes: [0, 1, 0]
        }),
        new DependencyOptions({
            relationSelector: 'ratePlan',
            relationIdSelector: 'ratePlanId',
            stateSelector: 'siteMinderRatePlans'
        }),
        new DependencyOptions({
            relationSelector: 'channel',
            relationIdSelector: 'channelId',
            stateSelector: 'siteMinderChannels'
        }),
    ];

    constructor(
        protected ngRedux: NgRedux<SiteMinderLodgingTypeRatePlanChannelsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_REDUCER_KEY); }

    public get(packagePath: string): Observable<LocalObject<LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey>[]> {
        return this.getWithDependencies(packagePath, this.deps);
    }

    public getSingle(packagePath: string, id: LodgingTypeRatePlanChannelKey): Observable<LocalObject<LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey>> {
        return this.getSingleWithDependency(packagePath, id, this.deps);
    }
}
