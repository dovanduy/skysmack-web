import { HttpErrorResponse } from '@skysmack/framework';
import { ReduxAction, RecordRequests } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { User } from './user';
import { GetUsersRolesSuccessPayload } from '../payloads';

export interface UsersRequests extends RecordRequests<User, number> {
    getUsersRoles(packagePath: string, ids: number[]): Observable<ReduxAction<GetUsersRolesSuccessPayload> | ReduxAction<HttpErrorResponse>>
}