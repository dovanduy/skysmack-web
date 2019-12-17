import { LocalObject } from './local-object';
import { NumIndex } from './indexes';
import { HttpErrorResponse } from './http-error-response';
import { CancelAction } from '@skysmack/redux';

export class QueueItem {
    public message: string;
    public messageParams: NumIndex<string>;
    public packagePath: string
    public link: string;
    public localObject: LocalObject<any, any>;
    public cancelAction?: CancelAction;
    public deleteAction?: Function;
    public error: HttpErrorResponse;
    constructor(values: Partial<QueueItem>) {
        Object.assign(this, values);
    }
}
