import { TerminalAction } from './terminal-action';
import { ConnectionMessage } from './connection-message';

export class ChangeConnection extends ConnectionMessage {
    public terminalAction: TerminalAction;
}