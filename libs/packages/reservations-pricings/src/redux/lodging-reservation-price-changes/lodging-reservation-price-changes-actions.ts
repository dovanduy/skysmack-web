import { RecordActionsBase } from '@skysmack/redux';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { Store } from 'redux';
import { LodgingReservationPriceChangesAppState } from './lodging-reservation-price-changes-reducer';
import { LODGING_RESERVATION_PRICE_CHANGES_REDUX_KEY, LODGING_RESERVATION_PRICE_CHANGES_ADDITIONAL_PATHS } from '../../constants/constants';
import { LodgingReservationPriceChange } from '../../models/lodging-reservation-price-change';

export class LodgingReservationPriceChangesActions extends RecordActionsBase<LodgingReservationPriceChangesAppState, Store<LodgingReservationPriceChangesAppState>> {

    constructor(protected store: Store<LodgingReservationPriceChangesAppState>) { super(store, LODGING_RESERVATION_PRICE_CHANGES_REDUX_KEY, LODGING_RESERVATION_PRICE_CHANGES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<LodgingReservationPriceChange, number>): StrIndex<string> {
        return {
        };
    }
}