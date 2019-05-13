import { Record, LocalObject } from "@skysmack/framework";
import { Invoice } from '@skysmack/packages-invoices';

export class CashPayment extends Record<number> {
    public description: string;
    public currencyCode: number;
    public amount: number;
    public time = new Date();
    public invoiceId: number;
    public invoice: LocalObject<Invoice, number>;

    public constructor(init?: Partial<CashPayment>) {
        super();
        Object.assign(this, init);
    }
}
