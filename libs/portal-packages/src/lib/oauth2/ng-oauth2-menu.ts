import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, safeHasValue, Package, AllowAccessFor } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-framework';
import { OAUTH2_AREA_KEY } from '@skysmack/packages-oauth2';
import { map, take } from 'rxjs/operators';
import { Skysmack } from 'libs/packages/skysmack-core/src';
import { OAuth2TypeId } from '@skysmack/package-types';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { Guid } from 'guid-typescript';

@Injectable({ providedIn: 'root' })
export class NgOAuth2Menu extends SidebarMenu {
    public id = Guid.create().toString();
    public menuId = OAUTH2_AREA_KEY;
    public translationPrefix = 'OAUTH2.INDEX.';

    constructor(
        public store: NgSkysmackStore,
        public router: Router,
        public menuItemProviders: NgMenuItemProviders,
        public dialog: MatDialog
    ) {
        super(store, router, menuItemProviders);
        this.setNavbarMenu();
        this.runMenuItemProviders();
    }

    public setNavbarMenu(): void {

        this.addToNavbarMenuAreas([
            new MenuArea({
                area: 'identities',
                icon: 'account_circle',
                translationPrefix: this.translationPrefix,
                order: 1,
            })
        ]);

        this.store.getSkysmack().pipe(
            safeHasValue(),
            take(1),
            map((currentTenant: Skysmack) => currentTenant.packages
                .filter((_package: Package) => _package.type === OAuth2TypeId)
                .map(_package => this.addToNavbarMenuItems(new MenuItem({
                    area: 'identities',
                    allowAccessFor: AllowAccessFor.anonymous
                }).asEventAction(_package.name, (_this: NgOAuth2Menu) => {
                    const dialogRef = _this.dialog.open(LoginComponent, {
                        width: '500px',
                        data: { packagePath: _package.path }
                    });

                    dialogRef.afterClosed().pipe(take(1)).subscribe(() => { });
                }, 'account_circle', this)))
            )
        ).subscribe();
    }

    public setPrimaryMenu() { }

    public setSpeedDialMenu() { }
}
