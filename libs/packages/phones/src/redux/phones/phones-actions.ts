import { RecordActionsBase } from '@skysmack/redux';

import { Store } from 'redux';
import { PhonesAppState } from './phones-reducer';
import { PHONES_REDUX_KEY, PHONES_ADDITIONAL_PATHS } from '../../constants/constants';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { Phone } from '../../models/phone';


export class PhonesActions extends RecordActionsBase<PhonesAppState, Store<PhonesAppState>> {
    constructor(protected store: Store<PhonesAppState>) { super(store, PHONES_REDUX_KEY, PHONES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<Phone, number>): StrIndex<string> {
        return {
            name: record.object.name
        };
    }
}
