import { RecordEpicsBase, getReadDependencies } from '@skysmack/ng-framework';
import { PhoneLog, PHONE_LOGS_REDUX_KEY } from '@skysmack/packages-phones';
import { NgPhoneLogsRequests } from './ng-phone-logs-requests';
import { Injectable } from '@angular/core';
import { NgPhoneLogsNotifications } from '../ng-phone-logs-notifications';
import { NgPhonesActions } from '../../phones/redux/ng-phones-actions';
import { NgPhonesStore } from '../../phones/redux/ng-phones-store';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgPhoneLogsEpics extends RecordEpicsBase<PhoneLog, number> {
    constructor(
        protected requests: NgPhoneLogsRequests,
        protected notifications: NgPhoneLogsNotifications,
        private skysmackStore: NgSkysmackStore,
        private phonesActions: NgPhonesActions,
        private phonesStore: NgPhonesStore,
    ) {
        super(requests, PHONE_LOGS_REDUX_KEY, notifications);

        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: PHONE_LOGS_REDUX_KEY,
                relationIdSelector: 'sourcePhoneId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.phonesStore,
                actions: this.phonesActions
            }),
            ...getReadDependencies({
                prefix: PHONE_LOGS_REDUX_KEY,
                relationIdSelector: 'destinationPhoneId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.phonesStore,
                actions: this.phonesActions
            })
        ]);
    }
}
