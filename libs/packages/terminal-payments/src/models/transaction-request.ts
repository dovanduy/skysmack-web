import { Currency } from './currency';

export class TransactionRequest {
    public clientId: number;
    public terminalId: number;
    public amount: number;
    public reference: number;
    public currency: Currency;

    constructor(values: Partial<TransactionRequest>) {
        Object.assign(this, values);
    }
}