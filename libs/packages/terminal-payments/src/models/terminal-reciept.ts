import { DocumentRecord } from '@skysmack/framework';

export class TerminalReciept extends DocumentRecord<number> {
    public type: string; // limited to 255 characters
    public printReceipt: string;

    public constructor(init?: Partial<TerminalReciept>) {
        super();
        Object.assign(this, init);
    }
}
