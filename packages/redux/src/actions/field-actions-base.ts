import { Store } from 'redux';
import { ReduxAction } from './../action-types';
import { PackagePathPayload } from './../payloads/package-path-payload';
import { FieldSchemaViewModel, LocalObject, HttpMethod, LocalObjectStatus, QueueItem, NumIndex, StrIndex } from '@skysmack/framework';
import { Effect } from '../models/effect';
import { EffectRequest } from '../models/effect-request';
import { CancelActionMeta } from '../metas/offline-redux/cancel-action-meta';
import { CancelDynamicFieldActionPayload } from '../payloads/cancel-dynamic-field-action-payload';
import { GetSingleFieldPayload } from '../payloads/get-single-field-payload';

export class FieldActionsBase<TStateType, TStore extends Store<TStateType>> {
    public static CANCEL_DYNAMIC_FIELD_ACTION = 'CANCEL_DYNAMIC_FIELD_ACTION';

    public static FIELD_GET_PAGED = 'FIELD_GET_PAGED';
    public static FIELD_GET_PAGED_SUCCESS = 'FIELD_GET_PAGED_SUCCESS';
    public static FIELD_GET_PAGED_FAILURE = 'FIELD_GET_PAGED_FAILURE';

    public static FIELD_GET_SINGLE = 'FIELD_GET_SINGLE';
    public static FIELD_GET_SINGLE_SUCCESS = 'FIELD_GET_SINGLE_SUCCESS';
    public static FIELD_GET_SINGLE_FAILURE = 'FIELD_GET_SINGLE_FAILURE';

    public static FIELD_GET_AVAILABLE_FIELDS = 'FIELD_GET_AVAILABLE_FIELDS';
    public static FIELD_GET_AVAILABLE_FIELDS_SUCCESS = 'FIELD_GET_AVAILABLE_FIELDS_SUCCESS';
    public static FIELD_GET_AVAILABLE_FIELDS_FAILURE = 'FIELD_GET_AVAILABLE_FIELDS_FAILURE';

    public static FIELD_ADD = 'FIELD_ADD';
    public static FIELD_ADD_SUCCESS = 'FIELD_SUCCESS';
    public static FIELD_ADD_FAILURE = 'FIELD_FAILURE';

    public static FIELD_UPDATE = 'FIELD_UPDATE';
    public static FIELD_UPDATE_SUCCESS = 'FIELD_UPDATE_SUCCESS';
    public static FIELD_UPDATE_FAILURE = 'FIELD_UPDATE_FAILURE';

    public static FIELD_DELETE = 'FIELD_DELETE';
    public static FIELD_DELETE_SUCCESS = 'FIELD_DELETE_SUCCESS';
    public static FIELD_DELETE_FAILURE = 'FIELD_DELETE_FAILURE';

    constructor(
        protected store: TStore,
        protected additionalPaths: string[]
    ) { }

    public cancelDynamicFieldAction = (field: LocalObject<FieldSchemaViewModel, string>, packagePath: string): void => {
        this.store.dispatch(Object.assign({}, new ReduxAction<CancelDynamicFieldActionPayload<FieldSchemaViewModel>>({
            type: FieldActionsBase.CANCEL_DYNAMIC_FIELD_ACTION,
            payload: {
                field,
                packagePath,
                prefix: '' // TODO: Remove this and refactor other code accordingly.
            },
            meta: new CancelActionMeta()
        })))
    }

    public getPaged(packagePath: string) {
        this.store.dispatch(Object.assign({}, new ReduxAction<PackagePathPayload>({
            type: FieldActionsBase.FIELD_GET_PAGED,
            payload: {
                packagePath
            }
        })));
    }

    public getSingle(packagePath: string, fieldKey: string) {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetSingleFieldPayload>({
            type: FieldActionsBase.FIELD_GET_SINGLE,
            payload: {
                packagePath,
                fieldKey
            }
        })));
    }

    public getAvailableFields(packagePath: string) {
        this.store.dispatch(Object.assign({}, new ReduxAction<PackagePathPayload>({
            type: FieldActionsBase.FIELD_GET_AVAILABLE_FIELDS,
            payload: {
                packagePath
            }
        })));
    }

    public add = (fields: LocalObject<FieldSchemaViewModel, string>[], packagePath: string) => {

        fields.forEach(record => record.error = false);

        const queueItems = fields.map(field => {
            return new QueueItem({
                message: `FIELDS.QUEUE.ADDING`, // TODO: Remember to rename this if needed.
                messageParams: this.getMessageParams(field),
                link: `${this.addAdditionalPaths(packagePath)}/fields/create`,
                packagePath,
                localObject: field,
                cancelAction: this.cancelDynamicFieldAction
            });
        })

        this.store.dispatch(Object.assign({}, new ReduxAction<any, any>({
            type: FieldActionsBase.FIELD_ADD,
            meta: {
                offline: {
                    effect: new Effect<FieldSchemaViewModel[]>(new EffectRequest<FieldSchemaViewModel[]>(
                        this.addAdditionalPaths(packagePath) + '/fields',
                        HttpMethod.POST,
                        fields.map(x => x.object)
                    )),
                    commit: new ReduxAction({
                        type: FieldActionsBase.FIELD_ADD_SUCCESS,
                        meta: {
                            value: fields,
                            packagePath,
                            queueItems
                        }
                    }),
                    rollback: new ReduxAction({
                        type: FieldActionsBase.FIELD_ADD_FAILURE,
                        meta: {
                            value: fields,
                            packagePath,
                            queueItems
                        }
                    })
                }
            }
        })));
    }

    public update = (fields: LocalObject<FieldSchemaViewModel, string>[], packagePath: string) => {

        fields.forEach(record => record.error = false);

        const queueItems = fields.map(field => {
            return new QueueItem({
                message: `FIELDS.QUEUE.UPDATING`,
                messageParams: this.getMessageParams(field),
                link: `${this.addAdditionalPaths(packagePath)}/fields/edit/${field.object.key}`,
                packagePath,
                localObject: field,
                cancelAction: this.cancelDynamicFieldAction
            });
        });

        this.store.dispatch(Object.assign({}, new ReduxAction<any, any>({
            type: FieldActionsBase.FIELD_UPDATE,
            meta: {
                offline: {
                    // TODO: Add [] FieldSchemaViewModel both places below when fields accepts arrays.
                    effect: new Effect<FieldSchemaViewModel>(new EffectRequest<FieldSchemaViewModel>(
                        // TODO: Use this below when fields accepts array: packagePath + '/fields
                        this.addAdditionalPaths(packagePath) + '/fields/' + fields[0].object.key,
                        HttpMethod.PUT,
                        // TODO: Use this below when fields accepts array: fields.map(x => x.object)
                        fields[0].object
                    )),
                    commit: new ReduxAction({
                        type: FieldActionsBase.FIELD_UPDATE_SUCCESS,
                        meta: {
                            value: fields,
                            packagePath,
                            // TODO: Remove below when fields return only the modified fields back
                            temp: fields[0].object.key,
                            queueItems
                        }
                    }),
                    rollback: new ReduxAction({
                        type: FieldActionsBase.FIELD_UPDATE_FAILURE,
                        meta: {
                            value: fields,
                            packagePath,
                            queueItems
                        }
                    })
                }
            }
        })));
    }

    public delete = (fields: LocalObject<FieldSchemaViewModel, string>[], packagePath: string) => {
        const paths = '?keys=' + fields.map(x => x.object.key).join('&keys=');

        fields.forEach(record => record.error = false);

        const queueItems = fields.map(field => {
            return new QueueItem({
                message: `FIELDS.QUEUE.DELETING`,
                messageParams: this.getMessageParams(field),
                packagePath,
                localObject: field,
                cancelAction: this.cancelDynamicFieldAction,
                deleteAction: this.delete
            });
        });

        this.store.dispatch(Object.assign({}, new ReduxAction<any, any>({
            type: FieldActionsBase.FIELD_DELETE,
            meta: {
                offline: {
                    effect: new Effect<FieldSchemaViewModel[]>(new EffectRequest<FieldSchemaViewModel[]>(
                        this.addAdditionalPaths(packagePath) + '/fields' + paths,
                        HttpMethod.DELETE,
                        fields.map(x => {
                            x.status = LocalObjectStatus.DELETING
                            return x.object
                        }),
                    )),
                    commit: new ReduxAction({
                        type: FieldActionsBase.FIELD_DELETE_SUCCESS,
                        meta: {
                            value: fields,
                            packagePath,
                            queueItems
                        }
                    }),
                    rollback: new ReduxAction({
                        type: FieldActionsBase.FIELD_DELETE_FAILURE,
                        meta: {
                            value: fields,
                            packagePath,
                            queueItems
                        }
                    })
                }
            }
        })));
    }

    protected getMessageParams(field: LocalObject<FieldSchemaViewModel, string>): StrIndex<string> {
        return {
            0: field.object.display
        };
    };

    protected addAdditionalPaths(url: string): string {
        return this.additionalPaths ? [url, ...this.additionalPaths].join('/') : url;
    }
}