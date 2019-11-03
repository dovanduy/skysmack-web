import { RecordEpicsBase, getReadDependencies } from '@skysmack/ng-framework';
import { PhoneNumber, PHONE_NUMBERS_REDUX_KEY } from '@skysmack/packages-phones';
import { NgPhoneNumbersRequests } from './ng-phone-numbers-requests';
import { Injectable } from '@angular/core';
import { NgPhoneNumbersNotifications } from '../ng-phone-numbers-notifications';
import { NgPhonesActions } from '../../phones/redux/ng-phones-actions';
import { NgPhonesStore } from '../../phones/redux/ng-phones-store';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgPhoneNumbersEpics extends RecordEpicsBase<PhoneNumber, number> {
    constructor(
        protected requests: NgPhoneNumbersRequests,
        protected notifications: NgPhoneNumbersNotifications,
        private skysmackStore: NgSkysmackStore,
        private phonesActions: NgPhonesActions,
        private phonesStore: NgPhonesStore,
    ) {
        super(requests, PHONE_NUMBERS_REDUX_KEY, notifications);

        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: PHONE_NUMBERS_REDUX_KEY,
                relationIdSelector: 'phoneId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.phonesStore,
                actions: this.phonesActions
            })
        ]);
    }
}
