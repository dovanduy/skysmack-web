import { ConnectionMessage } from './connection-message';

export class Abort extends ConnectionMessage {
    constructor(values: Partial<Abort>) {
        super();
        Object.assign(this, values);
    }
}
