import { Record } from '@skysmack/framework';
import { TerminalStatus } from './terminal-status';

export interface ConnectionKey {
    terminalId: number;
    clientId: number;
}

export class Connection extends Record<ConnectionKey> {
    public readonly status: TerminalStatus;
}
