import { Record } from '@skysmack/framework';

export class RatePlan extends Record<number> {
    public name: string;
    public currencyCode: string;
    public beforeTax: boolean;

    public constructor(init?: Partial<RatePlan>) {
        super(init);
    }
}