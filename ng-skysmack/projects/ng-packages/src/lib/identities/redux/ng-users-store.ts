import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { User, UsersAppState, UsersState } from '@skysmack/packages-identities';
import { NgRecordReduxStore } from '@skysmack/ng-redux';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { defined } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgUsersStore extends NgRecordReduxStore<UsersAppState, User, number> {
    constructor(protected ngRedux: NgRedux<UsersAppState>) { super(ngRedux, 'users'); }

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
