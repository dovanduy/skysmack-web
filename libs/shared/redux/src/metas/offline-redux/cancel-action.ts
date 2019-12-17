import { LocalObject } from '@skysmack/framework';
import { CancelActionMeta } from './cancel-action-meta';

export class CancelAction {
    public type: string;
    public payload: {
        record: LocalObject<unknown, unknown>;
        packagePath: string;
        prefix?: string;
    };
    public meta = new CancelActionMeta();
    constructor(init?: CancelAction) {
        Object.assign(this, init);
    }
}
