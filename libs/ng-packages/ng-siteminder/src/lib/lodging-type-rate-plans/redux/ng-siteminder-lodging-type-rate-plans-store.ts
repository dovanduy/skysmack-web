import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingTypeRatePlan, SiteMinderLodgingTypeRatePlansAppState, SITE_MINDER_LODGING_TYPE_RATE_PLANS_REDUCER_KEY, LodgingTypeRatePlanKey } from '@skysmack/packages-siteminder';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DependencyOptions, LocalObject, hasValue } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderLodgingTypeRatePlansStore extends NgRecordStore<SiteMinderLodgingTypeRatePlansAppState, LodgingTypeRatePlan, LodgingTypeRatePlanKey> {
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
        })
    ];

    constructor(
        protected ngRedux: NgRedux<SiteMinderLodgingTypeRatePlansAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, SITE_MINDER_LODGING_TYPE_RATE_PLANS_REDUCER_KEY); }

    public get(packagePath: string): Observable<LocalObject<LodgingTypeRatePlan, LodgingTypeRatePlanKey>[]> {
        return this.getWithDependencies(packagePath, this.deps);
    }

    public getSingle(packagePath: string, id: LodgingTypeRatePlanKey): Observable<LocalObject<LodgingTypeRatePlan, LodgingTypeRatePlanKey>> {
        return this.getSingleWithDependency(packagePath, id, this.deps);
    }

    protected getSingleRecord(packagePath: string, id: LodgingTypeRatePlanKey): Observable<LocalObject<LodgingTypeRatePlan, LodgingTypeRatePlanKey>> {
        return this.get(packagePath).pipe(
            map(records => records.find(record => {
                const firstIdMatch = record.object.id.lodgingTypeId === id.lodgingTypeId;
                const secondIdMatch = record.object.id.ratePlanId === id.ratePlanId;
                return (firstIdMatch && secondIdMatch) ? true : false;
            })),
            hasValue()
        );
    }
}
