import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain } from '@skysmack/framework';
import { LodgingReservation } from '@skysmack/packages-lodging-reservations';
import { NgRecordRequests } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsRequests extends NgRecordRequests<LodgingReservation, number> implements NgLodgingReservationsRequests {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'LODGING_RESERVATIONS_', []);
    }

    // public setPassword(values: { password: string, confirmPassword: string }, packagePath: string, id: number) {
    //     const url = `${this.apiDomain.domain}/${packagePath}/lodging-reservations/set-passwords/${id}`;
    //     return this.http.put(url, values, { observe: 'response' })
    //         .pipe(
    //             catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
    //                 type: 'SET_PASSWORD_ERROR',
    //                 error: true
    //             }))))
    //         );
    // }

    // public getLodgingReservationsRoles(packagePath: string, ids: number[]): Observable<ReduxAction<GetLodgingReservationsRolesSuccessPayload> | ReduxAction<HttpErrorResponse>> {
    //     let url = this.addAdditionalPaths(`${this.apiDomain.domain}/${packagePath}`);
    //     url = this.appendValues(url + '/roles', ids);

    //     return this.http.get<{}>(url, { observe: 'response' })
    //         .pipe(
    //             map(response => Object.assign({}, new ReduxAction<GetLodgingReservationsRolesSuccessPayload>({
    //                 type: this.prefix + NgLodgingReservationsActions.GET_ROLES_SUCCESS,
    //                 payload: {
    //                     userRoles: response.body,
    //                     packagePath
    //                 }
    //             }))),
    //             catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
    //                 type: this.prefix + NgLodgingReservationsActions.GET_ROLES_FAILURE,
    //                 error: true,
    //                 payload: error
    //             }))))
    //         );
    // }
}
