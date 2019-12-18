import { LocalObject, Record, CancelAction, CancelActionMeta } from '@skysmack/framework';

export const createCancelAction = <TRecord extends Record<TKey>, TKey>(record: LocalObject<TRecord, TKey>, packagePath: string, prefix: string): CancelAction => {
    return new CancelAction({
        type: prefix + 'CANCEL_RECORD_ACTION',
        payload: {
            record,
            packagePath,
            prefix
        },
        meta: new CancelActionMeta()
    });
}
