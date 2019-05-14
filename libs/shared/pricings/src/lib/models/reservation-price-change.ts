import { Record } from '@skysmack/framework';
import { PriceChangeType } from './price-change-type';

export class ReservationPriceChange extends Record<number> {
    public change: number;
    public currencyCode: string;
    public changeType: PriceChangeType;
    public validFrom: Date;
    public validTo: Date;
    public recordId: number;
    public start: Date;
    public end: Date;
    // public daysOfWeek: DaysOfWeek; <-- This days of week is likey not what we want
}
