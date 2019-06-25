import { TerminalStatus } from '../models/terminal-status';

export interface TerminalStatusChangedMessage {
    type: 'TerminalStatusChanged';
    clientId: number
    terminalId: number;
    terminalStatus: TerminalStatus;
}
