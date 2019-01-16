import { RecordActionsBase, ReduxAction, Effect, EffectRequest, OfflineMeta, ReduxOfflineMeta } from '@skysmack/redux';
import { HttpMethod, NumIndex, HttpResponse } from '@skysmack/framework';
import { LodgingReservationsAppState } from './lodging-reservations-reducer';
import { Store } from 'redux';

export class LodgingReservationsActions extends RecordActionsBase<LodgingReservationsAppState, Store<LodgingReservationsAppState>> {
    // public static GET_ROLES = 'GET_ROLES';
    // public static GET_ROLES_SUCCESS = 'GET_ROLES_SUCCESS';
    // public static GET_ROLES_FAILURE = 'GET_ROLES_FAILURE';

    // public static ADD_ROLES = 'ADD_ROLES';
    // public static ADD_ROLES_SUCCESS = 'ADD_ROLES_SUCCESS';
    // public static ADD_ROLES_FAILURE = 'ADD_ROLES_FAILURE';

    // public static REMOVE_ROLES = 'REMOVE_ROLES';
    // public static REMOVE_ROLES_SUCCESS = 'REMOVE_ROLES_SUCCESS';
    // public static REMOVE_ROLES_FAILURE = 'REMOVE_ROLES_FAILURE';

    constructor(protected store: Store<LodgingReservationsAppState>) { super(store, 'LODGING_RESERVATIONS_', ['lodging-reservations']); }

    // public getLodgingReservationsRoles(packagePath: string, ids: number[]): void {
    //     this.store.dispatch(Object.assign({}, new ReduxAction<GetLodgingReservationsRolesPayload>({
    //         type: this.prefix + LodgingReservationsActions.GET_ROLES,
    //         payload: {
    //             packagePath,
    //             ids
    //         }
    //     })));
    // }

    // public addLodgingReservationsRoles(packagePath: string, userRolesDictionary: NumIndex<string[]>): void {
    //     this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<NumIndex<string[]>, HttpResponse, NumIndex<string[]>>>({
    //         type: this.prefix + LodgingReservationsActions.ADD_ROLES,
    //         meta: new ReduxOfflineMeta(
    //             new OfflineMeta<NumIndex<string[]>, HttpResponse, any>(
    //                 new Effect<NumIndex<string[]>>(new EffectRequest<NumIndex<string[]>>(
    //                     this.addAdditionalPaths(packagePath) + '/roles/add',
    //                     HttpMethod.POST,
    //                     userRolesDictionary
    //                 )),
    //                 new ReduxAction({
    //                     type: this.prefix + LodgingReservationsActions.ADD_ROLES_SUCCESS,
    //                     meta: {
    //                         stateKey: packagePath,
    //                         value: userRolesDictionary
    //                     }
    //                 }),
    //                 new ReduxAction({
    //                     type: this.prefix + LodgingReservationsActions.ADD_ROLES_FAILURE,
    //                     meta: {
    //                         stateKey: packagePath,
    //                         value: userRolesDictionary
    //                     }
    //                 })
    //             )
    //         )
    //     })));
    // }

    // public removeLodgingReservationsRoles(packagePath: string, userRolesDictionary: NumIndex<string[]>): void {
    //     this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<NumIndex<string[]>, HttpResponse, NumIndex<string[]>>>({
    //         type: this.prefix + LodgingReservationsActions.REMOVE_ROLES,
    //         meta: new ReduxOfflineMeta(
    //             new OfflineMeta<NumIndex<string[]>, HttpResponse, any>(
    //                 new Effect<NumIndex<string[]>>(new EffectRequest<NumIndex<string[]>>(
    //                     this.addAdditionalPaths(packagePath) + '/roles/remove',
    //                     HttpMethod.POST,
    //                     userRolesDictionary
    //                 )),
    //                 new ReduxAction({
    //                     type: this.prefix + LodgingReservationsActions.REMOVE_ROLES_SUCCESS,
    //                     meta: {
    //                         stateKey: packagePath,
    //                         value: userRolesDictionary
    //                     }
    //                 }),
    //                 new ReduxAction({
    //                     type: this.prefix + LodgingReservationsActions.REMOVE_ROLES_FAILURE,
    //                     meta: {
    //                         stateKey: packagePath,
    //                         value: userRolesDictionary
    //                     }
    //                 })
    //             )
    //         )
    //     })));
    // }
}
