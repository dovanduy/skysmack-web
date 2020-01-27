import { LocalObject, Record, StrIndex, QueueItem, HttpResponse, HttpMethod, LocalObjectStatus } from '@skysmack/framework';
import { createCancelAction } from './create-cancel-action';
import { ReduxOfflineMeta } from '../metas/offline-redux/redux-offline-meta';
import { OfflineMeta } from '../metas/offline-redux/offline-meta';
import { EffectRequest } from '../models/effect-request';
import { Effect } from '../models/effect';
import { CommitMeta } from '../metas/offline-redux/commit-meta';
import { ReduxAction } from '../action-types/redux-action';
import { RollbackMeta } from '../metas/offline-redux/rollback-meta';

export const createDeleteAction = <TRecord, TKey>(
    path: string,
    packagePath: string,
    actionType: string,
    prefix: string,
    records: LocalObject<TRecord, TKey>[],
    messageParams: { localId: string, messageParam: StrIndex<string> }[]
) => {
    const queueItems = records.map(record => {
        const withQueue = prefix + 'QUEUE';
        const cancelAction = createCancelAction(record, packagePath, actionType, prefix);
        const messageParam = messageParams.find(param => param.localId === record.localId);
        record.error = false;
        return new QueueItem({
            message: `${withQueue.replace('_QUEUE', '.QUEUE')}.DELETING`,
            messageParams: messageParam ? messageParam.messageParam : undefined,
            packagePath,
            localObject: record,
            cancelAction,
            deleteAction: {
                path,
                packagePath,
                actionType,
                prefix,
                records,
                cancelAction,
                messageParams
            }
        });
    });

    return Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<TRecord[], HttpResponse, LocalObject<TRecord, TKey>[]>>({
        type: prefix + 'DELETE',
        meta: new ReduxOfflineMeta(
            new OfflineMeta<TRecord[], HttpResponse, LocalObject<TRecord, TKey>[]>(
                new Effect<TRecord[]>(new EffectRequest<TRecord[]>(
                    path,
                    HttpMethod.DELETE,
                    records.map(x => {
                        x.status = LocalObjectStatus.DELETING;
                        return JSON.parse(JSON.stringify(x.object));
                    }),
                )),
                new ReduxAction<any, CommitMeta<LocalObject<TRecord, TKey>[]>>({
                    type: prefix + 'DELETE_SUCCESS',
                    meta: {
                        stateKey: packagePath,
                        value: records,
                        queueItems
                    }
                }),
                new ReduxAction<any, RollbackMeta<LocalObject<TRecord, TKey>[]>>({
                    type: prefix + 'DELETE_FAILURE',
                    meta: {
                        stateKey: packagePath,
                        value: records,
                        queueItems
                    }
                })
            )
        )
    }));
};