import { Record } from '@skysmack/framework';

export class PriceChange extends Record<number> {
    public change: number;
    public currencyCode: string;
    public isPercent: boolean;
    public validFrom: Date;
    public validTo: Date;
    public recordId: number;
    public minUnits: number;
    public maxUnits: number;
    public perUnit: number;
    public onlyValidUnits: boolean;
}