import { LocalObject } from '@skysmack/framework';
import { ConnectionKey, Connection } from './connection';

export class TransactionRequest {
    public clientId: number;
    public terminalId: number;
    public invoiceId: number;
    public amount: number;
    public currencyCode: string;

    // Below prop is front end only
    public connection: LocalObject<Connection, ConnectionKey>;

    constructor(values: Partial<TransactionRequest>) {
        Object.assign(this, values);
    }
}
