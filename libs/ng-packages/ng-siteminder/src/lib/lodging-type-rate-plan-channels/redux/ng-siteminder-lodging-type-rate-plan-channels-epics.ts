import { NgSiteMinderLodgingTypeRatePlanChannelsRequests } from './ng-siteminder-lodging-type-rate-plan-channels-requests';
import { SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_REDUX_KEY, LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey } from '@skysmack/packages-siteminder';
import { Injectable } from '@angular/core';
import { RecordEpicsBase, getReadDependencies } from '@skysmack/ng-framework';
import { NgSiteMinderLodgingTypeRatePlanChannelsNotifications } from '../ng-siteminder-lodging-type-rate-plan-channels-notifications';
import { NgSiteMinderRatePlansActions, NgSiteMinderRatePlansStore } from '../../rate-plans';
import { NgSiteMinderChannelsActions } from '../../channels/redux/ng-siteminder-channels-actions';
import { NgSiteMinderChannelsStore } from '../../channels/redux/ng-siteminder-channels-store';
import { NgLodgingTypesStore, NgLodgingTypesActions } from '@skysmack/ng-lodgings';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderLodgingTypeRatePlanChannelsEpics extends RecordEpicsBase<LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey> {
    constructor(
        protected requests: NgSiteMinderLodgingTypeRatePlanChannelsRequests,
        protected notifications: NgSiteMinderLodgingTypeRatePlanChannelsNotifications,
        protected skysmackStore: NgSkysmackStore,
        protected lodgingTypeActions: NgLodgingTypesActions,
        protected lodgingTypeStore: NgLodgingTypesStore,
        protected ratePlanActions: NgSiteMinderRatePlansActions,
        protected ratePlanStore: NgSiteMinderRatePlansStore,
        protected channelActions: NgSiteMinderChannelsActions,
        protected channelStore: NgSiteMinderChannelsStore,
    ) {
        super(requests, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_REDUX_KEY, notifications);

        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_REDUX_KEY,
                relationIdSelector: 'lodgingTypeId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.lodgingTypeStore,
                actions: this.lodgingTypeActions,
                dependencyIndexes: [0, 1, 0]
            }),
            ...getReadDependencies({
                prefix: SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_REDUX_KEY,
                relationIdSelector: 'ratePlanId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.ratePlanStore,
                actions: this.ratePlanActions
            }),
            ...getReadDependencies({
                prefix: SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_REDUX_KEY,
                relationIdSelector: 'channelId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.channelStore,
                actions: this.channelActions
            })
        ]);
    }
}
