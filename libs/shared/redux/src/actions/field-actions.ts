import { Store } from 'redux';
import { ReduxAction } from './../action-types';
import { PackagePathPayload } from './../payloads/package-path-payload';
import { FieldSchemaViewModel, LocalObject, HttpMethod, QueueItem, StrIndex, PagedQuery, getFieldStateKey, RSQLFilterBuilder, LimitQuery } from '@skysmack/framework';
import { Effect } from '../models/effect';
import { EffectRequest } from '../models/effect-request';
import { GetPagedEntitiesPayload } from '../payloads/get-paged-entities-payload';
import { EntityActions } from '../interfaces/entity-actions';
import { GetSingleEntityPayload } from '../payloads/get-single-entity-payload';
import { AdditionalPathsMeta } from '../metas/additional-paths-meta';
import { createCancelAction } from './create-cancel-action';
import { createDeleteAction } from './create-delete-action';

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

    private prefix = 'FIELD_';

    constructor(protected store: TStore) { }

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
        const stateKey = getFieldStateKey(packagePath, additionalPaths);

        const queueItems = fields.map(field => {
            return new QueueItem({
                message: `FIELD.QUEUE.ADDING`, // TODO: Remember to rename this if needed.
                messageParams: this.getMessageParams(field),
                link: `${this.addAdditionalPaths(packagePath, additionalPaths)}/fields/create`,
                packagePath,
                localObject: field,
                cancelAction: createCancelAction(field, stateKey, FieldActions.CANCEL_FIELD_ACTION, this.prefix)
            });
        });


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
        const stateKey = getFieldStateKey(packagePath, additionalPaths);

        const queueItems = fields.map(field => {
            return new QueueItem({
                message: `FIELD.QUEUE.UPDATING`,
                messageParams: this.getMessageParams(field),
                link: `${this.addAdditionalPaths(packagePath, additionalPaths)}/fields/edit/${field.object.key}`,
                packagePath,
                localObject: field,
                cancelAction: createCancelAction(field, stateKey, FieldActions.CANCEL_FIELD_ACTION, this.prefix)
            });
        });


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

        const stateKey = getFieldStateKey(packagePath, additionalPaths);
        let combinedPaths = this.addAdditionalPaths(packagePath, additionalPaths) + '/fields';
        const limit = fields.length;
        let rsql: RSQLFilterBuilder = new RSQLFilterBuilder();

        for (const item of fields) {
            const itemFilter = new RSQLFilterBuilder();
            if (typeof (item.objectIdentifier) === 'object') {
                const keys = Object.keys(item.objectIdentifier);
                for (const key of keys) {
                    itemFilter.column(item.identifier + '.' + key).equalTo(item.objectIdentifier[key]);
                }
            } else {
                itemFilter.column(item.identifier).equalTo(item.objectIdentifier.toString());
            }

            rsql.or().group(itemFilter);
        }

        const query = new LimitQuery({
            rsqlFilter: rsql,
            limit: limit
        });

        combinedPaths = `${combinedPaths}?query=${query.rsqlFilter.toList().build()}&limit=${query.limit}`;

        const messageParams = fields.map(record => ({
            localId: record.localId,
            messageParam: this.getMessageParams(record)
        }));

        this.store.dispatch(createDeleteAction(combinedPaths, stateKey, FieldActions.CANCEL_FIELD_ACTION, this.prefix, fields, messageParams));
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