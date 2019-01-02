import { Store } from 'redux';
import { RecordActionsBase } from './record-actions-base';
import { ReduxAction } from './../action-types';
import { PackagePathPayload } from './../payloads/package-path-payload';
import { FieldSchemaViewModel, LocalObject, HttpMethod } from '@skysmack/framework';
import { Effect } from '../models/effect';
import { EffectRequest } from '../models/effect-request';

export abstract class DocumentRecordActionsBase<TStateType, TStore extends Store<TStateType>> extends RecordActionsBase<TStateType, TStore> {

    public static GET_FIELDS = 'GET_FIELDS';
    public static GET_FIELDS_SUCCESS = 'GET_FIELDS_SUCCESS';
    public static GET_FIELDS_FAILURE = 'GET_FIELDS_FAILURE';

    public static GET_AVAILABLE_FIELDS = 'GET_AVAILABLE_FIELDS';
    public static GET_AVAILABLE_FIELDS_SUCCESS = 'GET_AVAILABLE_FIELDS_SUCCESS';
    public static GET_AVAILABLE_FIELDS_FAILURE = 'GET_AVAILABLE_FIELDS_FAILURE';

    public static GET_SINGLE_FIELD = 'GET_SINGLE_FIELD';
    public static GET_SINGLE_FIELD_SUCCESS = DocumentRecordActionsBase.GET_SINGLE_FIELD + '_SUCCESS';
    public static GET_SINGLE_FIELD_FAILURE = DocumentRecordActionsBase.GET_SINGLE_FIELD + '_FAILURE';

    public static ADD_FIELD = 'ADD_FIELD';
    public static ADD_FIELD_SUCCESS = DocumentRecordActionsBase.ADD_FIELD + '_SUCCESS';
    public static ADD_FIELD_FAILURE = DocumentRecordActionsBase.ADD_FIELD + '_FAILURE';

    public static UPDATE_FIELD = 'UPDATE_FIELD';
    public static UPDATE_FIELD_SUCCESS = DocumentRecordActionsBase.UPDATE_FIELD + '_SUCCESS';
    public static UPDATE_FIELD_FAILURE = DocumentRecordActionsBase.UPDATE_FIELD + '_FAILURE';

    public static DELETE_FIELD = 'DELETE_FIELD';
    public static DELETE_FIELD_SUCCESS = DocumentRecordActionsBase.DELETE_FIELD + '_SUCCESS';
    public static DELETE_FIELD_FAILURE = DocumentRecordActionsBase.DELETE_FIELD + '_FAILURE';

    constructor(
        protected store: TStore,
        protected prefix: string,
        protected additionalPaths: string[],
    ) {
        super(store, prefix, additionalPaths);
    }

    public getFields(packagePath: string) {
        this.store.dispatch(Object.assign({}, new ReduxAction<PackagePathPayload>({
            type: this.prefix + DocumentRecordActionsBase.GET_FIELDS,
            payload: {
                packagePath
            }
        })));
    }

    public getSingleField(path: string) {
        this.store.dispatch(Object.assign({}, new ReduxAction<string>({
            type: this.prefix + DocumentRecordActionsBase.GET_SINGLE_FIELD,
            payload: path
        })));
    }

    public getAvailableFields(packagePath: string) {
        this.store.dispatch(Object.assign({}, new ReduxAction<PackagePathPayload>({
            type: this.prefix + DocumentRecordActionsBase.GET_AVAILABLE_FIELDS,
            payload: {
                packagePath
            }
        })));
    }

    public addFields(fields: LocalObject<FieldSchemaViewModel,
        string>[], packagePath: string) {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, any>({
            type: this.prefix + DocumentRecordActionsBase.ADD_FIELD,
            meta: {
                offline: {
                    effect: new Effect<FieldSchemaViewModel[]>(new EffectRequest<FieldSchemaViewModel[]>(
                        packagePath + '/fields',
                        HttpMethod.POST,
                        fields.map(x => x.object)
                    )),
                    commit: new ReduxAction({
                        type: this.prefix + DocumentRecordActionsBase.ADD_FIELD_SUCCESS,
                        meta: {
                            fields,
                            packagePath
                        }
                    }),
                    rollback: new ReduxAction({
                        type: this.prefix + DocumentRecordActionsBase.ADD_FIELD_FAILURE,
                        meta: {
                            fields,
                            packagePath
                        }
                    })
                }
            }
        })));
    }

    public updateFields(fields: LocalObject<FieldSchemaViewModel,
        string>[], packagePath: string) {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, any>({
            type: this.prefix + DocumentRecordActionsBase.UPDATE_FIELD,
            meta: {
                offline: {
                    effect: new Effect<FieldSchemaViewModel[]>(new EffectRequest<FieldSchemaViewModel[]>(
                        packagePath + '/fields',
                        HttpMethod.PUT,
                        fields.map(x => x.object)
                    )),
                    commit: new ReduxAction({
                        type: this.prefix + DocumentRecordActionsBase.UPDATE_FIELD_SUCCESS,
                        meta: {
                            fields,
                            packagePath
                        }
                    }),
                    rollback: new ReduxAction({
                        type: this.prefix + DocumentRecordActionsBase.UPDATE_FIELD_FAILURE,
                        meta: {
                            fields,
                            packagePath
                        }
                    })
                }
            }
        })));
    }

    public deleteFields(fields: LocalObject<FieldSchemaViewModel,
        string>[], packagePath: string) {
        const paths = '?keys=' + fields.map(x => x.object.key).join('&keys=');

        this.store.dispatch(Object.assign({}, new ReduxAction<any, any>({
            type: this.prefix + DocumentRecordActionsBase.DELETE_FIELD,
            meta: {
                offline: {
                    effect: new Effect<FieldSchemaViewModel[]>(new EffectRequest<FieldSchemaViewModel[]>(
                        packagePath + '/fields' + paths,
                        HttpMethod.DELETE,
                        fields.map(x => x.object)
                    )),
                    commit: new ReduxAction({
                        type: this.prefix + DocumentRecordActionsBase.DELETE_FIELD_SUCCESS,
                        meta: {
                            fields
                        }
                    }),
                    rollback: new ReduxAction({
                        type: this.prefix + DocumentRecordActionsBase.DELETE_FIELD_FAILURE,
                        meta: {
                            fields
                        }
                    })
                }
            }
        })));
    }
}