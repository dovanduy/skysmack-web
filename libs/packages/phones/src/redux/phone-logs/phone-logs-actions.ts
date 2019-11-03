import { LocalObject, StrIndex } from '@skysmack/framework';
import { RecordActionsBase } from '@skysmack/redux';
import { Store } from 'redux';
import { PHONE_LOGS_REDUX_KEY, PHONE_LOGS_ADDITIONAL_PATHS } from '../../constants/constants';
import { PhoneLog } from '../../models/phone-log';
import { PhoneLogsAppState } from './phone-logs-reducer';


export class PhoneLogsActions extends RecordActionsBase<PhoneLogsAppState, Store<PhoneLogsAppState>> {
    constructor(protected store: Store<PhoneLogsAppState>) { super(store, PHONE_LOGS_REDUX_KEY, PHONE_LOGS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<PhoneLog, number>): StrIndex<string> {
        return {
            sourceNumber: record.object.sourceNumber
        };
    }
}
