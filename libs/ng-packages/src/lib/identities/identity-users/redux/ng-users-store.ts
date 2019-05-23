import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { User, UsersAppState, UsersState, USERS_REDUCER_KEY } from '@skysmack/packages-identities';
import { NgRecordStore } from '@skysmack/ng-framework';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { defined } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgUsersStore extends NgRecordStore<UsersAppState, User, number> {
    constructor(
        protected ngRedux: NgRedux<UsersAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, USERS_REDUCER_KEY); }

    public getUserRoles(packagePath: string, id: number): Observable<string[]> {
        return this.getState<UsersState>().pipe(
            map(state => state.usersRoles),
            defined(),
            map(usersRoles => usersRoles[packagePath]),
            defined(),
            map(userRolesDictionary => userRolesDictionary[id]),
            defined()
        );
    }
}
