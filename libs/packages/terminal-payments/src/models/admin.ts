import { ConnectionMessage } from './connection-message';

export class Admin extends ConnectionMessage {
    public adminFunction: number;

    constructor(values: Partial<Admin>) {
        super();
        Object.assign(this, values);
    }
}
