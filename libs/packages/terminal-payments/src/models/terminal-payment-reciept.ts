import { DocumentRecord } from '@skysmack/framework';

export class TerminalPaymentReciept extends DocumentRecord<number> {
    public referenceNumber: number;
    public printReceipt: string;
    public receiptDocument: string;
    public invoicePaymentId?: number;

    public constructor(init?: Partial<TerminalPaymentReciept>) {
        super();
        Object.assign(this, init);
    }
}
