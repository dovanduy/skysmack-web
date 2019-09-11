import { RecordActionsBase } from '@skysmack/redux';
import { Store } from 'redux';
import { LodgingsAppState } from './lodgings-reducer';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { Lodging } from '../../models/lodging';
import { LODGINGS_REDUX_KEY, LODGINGS_ADDITIONAL_PATHS } from '../../constants';


export class LodgingsActions extends RecordActionsBase<LodgingsAppState, Store<LodgingsAppState>> {
    constructor(protected store: Store<LodgingsAppState>) { super(store, LODGINGS_REDUX_KEY, LODGINGS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<Lodging, number>): StrIndex<string> {
        return {
            name: record.object.name
        };
    }
}