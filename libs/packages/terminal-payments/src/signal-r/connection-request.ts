import { TerminalAction } from '../models/terminal-action';

export class ConnectionRequest {
    public type: 'changeConnection';
    public clientId: string;
    public terminalId: number;
    public terminalAction: TerminalAction;

    public constructor(init?: Partial<ConnectionRequest>) {
        Object.assign(this, init);
    }
}
