import { TerminalStatus } from '../models/terminal-status';

export interface TerminalStatusChangedMessage {
    type: 'TerminalStatusChanged';
    clientId: string
    terminalId: number;
    terminalStatus: TerminalStatus;
}
