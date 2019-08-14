import { DocumentRecord } from '@skysmack/framework';

export class TerminalReceipt extends DocumentRecord<number> {
    public type: string; // limited to 255 characters
    public printReceipt: string;

    public constructor(init?: Partial<TerminalReceipt>) {
        super();
        Object.assign(this, init);
    }
}
