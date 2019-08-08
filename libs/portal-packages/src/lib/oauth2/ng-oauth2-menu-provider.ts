import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, safeHasValue, Package, AllowAccessFor, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgAuthenticationActions } from '@skysmack/ng-framework';
import { map } from 'rxjs/operators';
import { OAuth2TypeId } from '@skysmack/package-types';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { Guid } from 'guid-typescript';
import { NgRedux } from '@angular-redux/store';
import { persistStore } from 'redux-persist';
import { Skysmack } from '@skysmack/packages-skysmack-core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgOAuth2MenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'OAUTH2.INDEX.';

    constructor(
        public store: NgSkysmackStore,
        public dialog: MatDialog,
        public mainStore: NgRedux<any>,
        public authenticationActions: NgAuthenticationActions
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return of([
            new MenuArea({
                area: 'identities',
                icon: 'account_circle',
                translationPrefix: this.translationPrefix,
                order: 1
            })
        ]);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return this.store.getSkysmack().pipe(
            safeHasValue(),
            map((currentTenant: Skysmack) => currentTenant.packages
                .filter((_package: Package) => _package.type === OAuth2TypeId)
                .map(_package => [
                    new MenuItem({
                        area: 'identities',
                        allowAccessFor: AllowAccessFor.anonymous,
                        providedIn: ['top']
                    }).asEventAction(_package.name, (_this: NgOAuth2MenuProvider) => {
                        _this.dialog.open(LoginComponent, {
                            width: '500px',
                            data: { packagePath: _package.path }
                        });
                    }, 'account_circle', this),
                    new MenuItem({
                        area: 'identities',
                        allowAccessFor: AllowAccessFor.authenticated,
                        providedIn: ['top']
                    }).asEventAction('Logout', (_this: NgOAuth2MenuProvider) => {
                        _this.logout();
                    },
                        'account_circle', this)
                ]).reduce((a, b) => a.concat(b), [])
            )
        );
    };

    public logout() {
        const persistor = persistStore(this.mainStore);
        persistor.purge();
        this.authenticationActions.logout();
    }
}
