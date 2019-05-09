import { Record } from "@skysmack/framework";

export class CashPayment extends Record<number> {
    public description: string;
    public currencyCode: number;
    public amount: number;
    public time = new Date();
    public invoiceId: number;

    public constructor(init?: Partial<CashPayment>) {
        super();
        Object.assign(this, init);
    }
}
