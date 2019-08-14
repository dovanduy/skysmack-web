import { DocumentRecord } from '@skysmack/framework';

export class TerminalPaymentReceipt extends DocumentRecord<number> {
    public referenceNumber: number;
    public printReceipt: string;
    public receiptDocument: string;
    public invoicePaymentId?: number;

    public constructor(init?: Partial<TerminalPaymentReceipt>) {
        super();
        Object.assign(this, init);
    }
}
