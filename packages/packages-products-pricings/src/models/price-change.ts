import { Record } from '@skysmack/framework';
import { PriceChangeType } from './price-change-type';

export class PriceChange extends Record<number> {
    public change: number;
    public currencyCodeId: string;
    public changeType: PriceChangeType;
    public validFrom: Date;
    public validto: Date;
    public recordId: number;
}