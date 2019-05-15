import { Record } from '@skysmack/framework';
import { PriceChangeType } from './price-change-type';

export class PriceChange extends Record<number> {
    public change: number;
    public currencyCode: string;
    public changeType: PriceChangeType;
    public validFrom: Date;
    public validTo: Date;
    public recordId: number;

    // START HERE: Add below props, then add these + those in ReservationPriceChange to lodging  reservation price change cruds, and only those in this model to product price change cruds.

    // public int MinUnits
    // public int MaxUnits
    // public bool ChangeIncludesAllUnits
}