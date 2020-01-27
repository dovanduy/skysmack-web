import { LocalObject } from './local-object';
import { NumIndex, StrIndex } from './indexes';
import { HttpErrorResponse } from './http-error-response';
import { CancelAction } from './cancel-action';

export class QueueItem {
    public message: string;
    public messageParams: NumIndex<string>;
    public packagePath: string
    public link: string;
    public localObject: LocalObject<any, any>;
    public cancelAction?: CancelAction;
    public deleteAction?: {
        path: string,
        packagePath: string,
        actionType: string,
        prefix: string,
        records: LocalObject<unknown, unknown>[],
        cancelAction: CancelAction,
        messageParams: { localId: string, messageParam: StrIndex<string> }[]
    };
    public error: HttpErrorResponse;
    constructor(values: Partial<QueueItem>) {
        Object.assign(this, values);
    }
}
