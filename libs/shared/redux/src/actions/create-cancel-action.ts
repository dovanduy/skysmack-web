import { LocalObject, CancelAction, CancelActionMeta } from '@skysmack/framework';

export const createCancelAction = <TRecord, TKey>(record: LocalObject<TRecord, TKey>, packagePath: string, actionType: string, prefix: string): CancelAction => {
    const type = `${prefix}${actionType}`;
    return new CancelAction({
        type,
        payload: {
            record,
            packagePath,
            prefix
        },
        meta: new CancelActionMeta()
    });
}
