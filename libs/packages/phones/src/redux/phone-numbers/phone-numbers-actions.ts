import { LocalObject, StrIndex } from '@skysmack/framework';
import { RecordActionsBase } from '@skysmack/redux';
import { Store } from 'redux';
import { PHONE_NUMBERS_REDUX_KEY, PHONE_NUMBERS_ADDITIONAL_PATHS } from '../../constants/constants';
import { PhoneNumber } from '../../models/phone-number';
import { PhoneNumbersAppState } from './phone-numbers-reducer';


export class PhoneNumbersActions extends RecordActionsBase<PhoneNumbersAppState, Store<PhoneNumbersAppState>> {
    constructor(protected store: Store<PhoneNumbersAppState>) { super(store, PHONE_NUMBERS_REDUX_KEY, PHONE_NUMBERS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<PhoneNumber, number>): StrIndex<string> {
        return {
            number: record.object.number
        };
    }
}
