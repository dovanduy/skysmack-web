import { ConnectionMessage } from './connection-message';

export class CardTransaction extends ConnectionMessage {
    public invoiceId?: number;
    public amount: number; // Decimal
    public currencyCode: string;
}
