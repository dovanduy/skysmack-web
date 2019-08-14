import { DocumentRecord, LocalObject } from '@skysmack/framework';
import { InvoicePayment } from '@skysmack/packages-invoices';

export class TerminalPaymentReceipt extends DocumentRecord<number> {
    public referenceNumber: number;
    public printReceipt: string;
    public receiptDocument: string;
    public invoicePaymentId?: number;
    public invoicePayment?: LocalObject<InvoicePayment, number>

    public constructor(init?: Partial<TerminalPaymentReceipt>) {
        super();
        Object.assign(this, init);
    }
}
