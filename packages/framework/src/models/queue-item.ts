import { LocalObject } from './local-object';
import { NumIndex } from './indexes';

export class QueueItem {
    public message: string;
    public messageParams: NumIndex<string>;
    public packagePath: string
    public link?: string;
    public localObject: LocalObject<any, any>;
    public cancelAction?: Function;
    constructor(values: Partial<QueueItem>) {
        Object.assign(this, values);
    }
}
