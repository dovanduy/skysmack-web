import { Store } from 'redux';
import { ReduxAction } from './../action-types';
import { PackagePathPayload } from './../payloads/package-path-payload';
import { FieldSchemaViewModel, LocalObject, HttpMethod, LocalObjectStatus, QueueItem, StrIndex, PagedQuery, getFieldStateKey } from '@skysmack/framework';
import { Effect } from '../models/effect';
import { EffectRequest } from '../models/effect-request';
import { CancelActionMeta } from '../metas/offline-redux/cancel-action-meta';
import { CancelFieldActionPayload } from '../payloads/cancel-field-action-payload';
import { GetPagedEntitiesPayload } from '../payloads/get-paged-entities-payload';
import { EntityActions } from '../interfaces/entity-actions';
import { GetSingleEntityPayload } from '../payloads/get-single-entity-payload';
import { AdditionalPathsMeta } from '../metas/additional-paths-meta';

export class FieldActions<TStateType, TStore extends Store<TStateType>> implements EntityActions<FieldSchemaViewModel, string> {
    public static CANCEL_FIELD_ACTION = 'CANCEL_FIELD_ACTION';

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
    public static FIELD_ADD_SUCCESS = 'FIELD_ADD_SUCCESS';
    public static FIELD_ADD_FAILURE = 'FIELD_ADD_FAILURE';

    public static FIELD_UPDATE = 'FIELD_UPDATE';
    public static FIELD_UPDATE_SUCCESS = 'FIELD_UPDATE_SUCCESS';
    public static FIELD_UPDATE_FAILURE = 'FIELD_UPDATE_FAILURE';

    public static FIELD_DELETE = 'FIELD_DELETE';
    public static FIELD_DELETE_SUCCESS = 'FIELD_DELETE_SUCCESS';
    public static FIELD_DELETE_FAILURE = 'FIELD_DELETE_FAILURE';

    constructor(protected store: TStore) { }

    public cancelAction = (field: LocalObject<FieldSchemaViewModel, string>, packagePath: string): void => {
        this.store.dispatch(Object.assign({}, new ReduxAction<CancelFieldActionPayload<FieldSchemaViewModel>>({
            type: FieldActions.CANCEL_FIELD_ACTION,
            payload: {
                field,
                packagePath
            },
            meta: new CancelActionMeta()
        })))
    }

    public getPaged(packagePath: string, pagedQuery: PagedQuery, additionalPaths?: string[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetPagedEntitiesPayload, AdditionalPathsMeta>({
            type: FieldActions.FIELD_GET_PAGED,
            payload: {
                pagedQuery,
                packagePath
            },
            meta: {
                additionalPaths
            }
        })));
    }

    public getSingle(packagePath: string, fieldKey: string, additionalPaths?: string[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetSingleEntityPayload<string>, AdditionalPathsMeta>({
            type: FieldActions.FIELD_GET_SINGLE,
            payload: {
                id: fieldKey,
                packagePath
            },
            meta: {
                additionalPaths
            }
        })));
    }

    public getAvailableFields(packagePath: string, additionalPaths?: string[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<PackagePathPayload, AdditionalPathsMeta>({
            type: FieldActions.FIELD_GET_AVAILABLE_FIELDS,
            payload: {
                packagePath
            },
            meta: {
                additionalPaths
            }
        })));
    }

    public add = (fields: LocalObject<FieldSchemaViewModel, string>[], packagePath: string, additionalPaths?: string[]) => {

        fields.forEach(record => record.error = false);

        const queueItems = fields.map(field => {
            return new QueueItem({
                message: `FIELDS.QUEUE.ADDING`, // TODO: Remember to rename this if needed.
                messageParams: this.getMessageParams(field),
                link: `${this.addAdditionalPaths(packagePath, additionalPaths)}/fields/create`,
                packagePath,
                localObject: field,
                cancelAction: this.cancelAction
            });
        })

        const stateKey = getFieldStateKey(packagePath, additionalPaths);

        this.store.dispatch(Object.assign({}, new ReduxAction<any, any>({
            type: FieldActions.FIELD_ADD,
            meta: {
                offline: {
                    effect: new Effect<FieldSchemaViewModel[]>(new EffectRequest<FieldSchemaViewModel[]>(
                        this.addAdditionalPaths(packagePath, additionalPaths) + '/fields',
                        HttpMethod.POST,
                        fields.map(x => x.object)
                    )),
                    commit: new ReduxAction({
                        type: FieldActions.FIELD_ADD_SUCCESS,
                        meta: {
                            stateKey,
                            value: fields,
                            packagePath,
                            queueItems
                        }
                    }),
                    rollback: new ReduxAction({
                        type: FieldActions.FIELD_ADD_FAILURE,
                        meta: {
                            stateKey,
                            value: fields,
                            packagePath,
                            queueItems
                        }
                    })
                }
            }
        })));
    }

    public update = (fields: LocalObject<FieldSchemaViewModel, string>[], packagePath: string, additionalPaths?: string[]) => {

        fields.forEach(record => record.error = false);

        const queueItems = fields.map(field => {
            return new QueueItem({
                message: `FIELDS.QUEUE.UPDATING`,
                messageParams: this.getMessageParams(field),
                link: `${this.addAdditionalPaths(packagePath, additionalPaths)}/fields/edit/${field.object.key}`,
                packagePath,
                localObject: field,
                cancelAction: this.cancelAction
            });
        });

        const stateKey = getFieldStateKey(packagePath, additionalPaths);

        this.store.dispatch(Object.assign({}, new ReduxAction<any, any>({
            type: FieldActions.FIELD_UPDATE,
            meta: {
                offline: {
                    effect: new Effect<FieldSchemaViewModel[]>(new EffectRequest<FieldSchemaViewModel[]>(
                        this.addAdditionalPaths(packagePath, additionalPaths) + '/fields',
                        HttpMethod.PUT,
                        fields.map(x => x.object)
                    )),
                    commit: new ReduxAction({
                        type: FieldActions.FIELD_UPDATE_SUCCESS,
                        meta: {
                            stateKey,
                            value: fields,
                            packagePath,
                            queueItems
                        }
                    }),
                    rollback: new ReduxAction({
                        type: FieldActions.FIELD_UPDATE_FAILURE,
                        meta: {
                            stateKey,
                            value: fields,
                            packagePath,
                            queueItems
                        }
                    })
                }
            }
        })));
    }

    public delete = (fields: LocalObject<FieldSchemaViewModel, string>[], packagePath: string, additionalPaths?: string[]) => {
        fields.forEach(record => record.error = false);

        const paths = '?keys=' + fields.map(x => x.object.key).join('&keys=');

        const queueItems = fields.map(field => {
            return new QueueItem({
                message: `FIELDS.QUEUE.DELETING`,
                messageParams: this.getMessageParams(field),
                packagePath,
                localObject: field,
                cancelAction: this.cancelAction,
                deleteAction: this.delete
            });
        });

        const stateKey = getFieldStateKey(packagePath, additionalPaths);

        this.store.dispatch(Object.assign({}, new ReduxAction<any, any>({
            type: FieldActions.FIELD_DELETE,
            meta: {
                offline: {
                    effect: new Effect<FieldSchemaViewModel[]>(new EffectRequest<FieldSchemaViewModel[]>(
                        this.addAdditionalPaths(packagePath, additionalPaths) + '/fields' + paths,
                        HttpMethod.DELETE,
                        fields.map(x => {
                            x.status = LocalObjectStatus.DELETING
                            return x.object
                        }),
                    )),
                    commit: new ReduxAction({
                        type: FieldActions.FIELD_DELETE_SUCCESS,
                        meta: {
                            stateKey,
                            value: fields,
                            packagePath,
                            queueItems
                        }
                    }),
                    rollback: new ReduxAction({
                        type: FieldActions.FIELD_DELETE_FAILURE,
                        meta: {
                            stateKey,
                            value: fields,
                            packagePath,
                            queueItems
                        }
                    })
                }
            }
        })));
    }

    public getMessageParams(field: LocalObject<FieldSchemaViewModel, string>): StrIndex<string> {
        return {
            0: field.object.display
        };
    };

    protected addAdditionalPaths(url: string, additionalPaths: string[]): string {
        return additionalPaths ? [url, ...additionalPaths].join('/') : url;
    }

    protected getStateKey(packagePath: string, additionalPaths: string[]) {
        return `${packagePath}-${additionalPaths.join('-')}`
    }
}