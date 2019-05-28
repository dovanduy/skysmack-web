import { Record, LocalObject } from '@skysmack/framework';

export class PriceChange extends Record<number> {
    public change: number;
    public currencyCode: string;
    public isPercentage: boolean;
    public validFrom: Date;
    public validTo: Date;
    public recordId: number;
    public record: LocalObject<any, unknown>;
    public minUnits: number;
    public maxUnits: number;
    public perUnit: number;
    public onlyValidUnits: boolean;
}