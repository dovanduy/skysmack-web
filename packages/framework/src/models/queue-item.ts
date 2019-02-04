import { LocalObject } from './local-object';

export class QueueItem {
    public message: string;
    public messageParams: { 0: string };
    public packagePath: string
    public link?: string;
    public localObject: LocalObject<any, any>;
    public cancelAction?: Function;
    constructor(values: Partial<QueueItem>) {
        Object.assign(this, values);
    }
}
