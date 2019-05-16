import { Record } from '@skysmack/framework';
import { PriceChangeType } from './price-change-type';

export class PriceChange extends Record<number> {
    public change: number;
    public currencyCode: string;
    public changeType: PriceChangeType;
    public validFrom: Date;
    public validTo: Date;
    public recordId: number;

    public minUnits: number;
    public maxUnits: number;
    public changeIncludesAllUnits: boolean;
}