import { RecordActionsBase } from '@skysmack/redux';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { Store } from 'redux';
import { LodgingTypeReservationPriceChange } from '../../models/lodging-type-reservation-price-change';
import { LODGING_TYPE_RESERVATION_PRICE_CHANGES_REDUX_KEY, LODGING_TYPE_RESERVATION_PRICE_CHANGES_ADDITIONAL_PATHS } from '../../constants/constants';
import { LodgingTypeReservationPriceChangesAppState } from './lodging-type-reservation-price-changes-reducer';

export class LodgingTypeReservationPriceChangesActions extends RecordActionsBase<LodgingTypeReservationPriceChangesAppState, Store<LodgingTypeReservationPriceChangesAppState>> {

    constructor(protected store: Store<LodgingTypeReservationPriceChangesAppState>) { super(store, LODGING_TYPE_RESERVATION_PRICE_CHANGES_REDUX_KEY, LODGING_TYPE_RESERVATION_PRICE_CHANGES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<LodgingTypeReservationPriceChange, number>): StrIndex<string> {
        return {
            id: record.object.change.toString()
        };
    }
}