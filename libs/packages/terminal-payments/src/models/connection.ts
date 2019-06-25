import { Record, LocalObject } from '@skysmack/framework';
import { TerminalStatus } from './terminal-status';
import { Terminal } from './terminal';
import { Client } from './client';

export interface ConnectionKey {
    terminalId: number;
    clientId: number;
}

export class Connection extends Record<ConnectionKey> {
    public status: TerminalStatus;
    public terminal: LocalObject<Terminal, number>;
    public client: LocalObject<Client, number>;
}
