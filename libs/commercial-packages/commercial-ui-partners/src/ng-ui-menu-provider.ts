import { Injectable } from '@angular/core';
import { MenuProvider, MenuArea, MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable, of } from 'rxjs';
import { NgAuthenticationActions } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgUiMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'COMMERCIAL_UI_PARTNERS.INDEX.';

    constructor(
        public actions: NgAuthenticationActions,
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return of(this.getUiMenuAreas());
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return of(this.getUiMenuItems());
    };

    private getUiMenuAreas = (): MenuArea[] => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ];
    }

    private getUiMenuItems = (): MenuItem[] => {
        return [
            new MenuItem({
                url: '/account/change-password',
                displayName: this.translationPrefix + 'CHANGEPASSWORD',
                area: 'manage',
                order: 1,
                icon: 'add',
                providedIn: ['top']
            }),
            new MenuItem({
                area: 'manage',
                providedIn: ['top']
            }).asEventAction(this.translationPrefix + 'LOGOUT', () => {
                this.actions.logout();
            }, 'add', this)
        ];
    }
}