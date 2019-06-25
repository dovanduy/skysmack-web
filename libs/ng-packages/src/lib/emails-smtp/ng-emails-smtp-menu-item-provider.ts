import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { safeHasValue, Package, MenuItemProvider, MenuItem } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { Skysmack } from '@skysmack/packages-skysmack-core';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { EmailsSmtpType } from '@skysmack/packages/emails-smtp';

@Injectable({ providedIn: 'root' })
export class NgEmailsSmtpMenuItemProvider extends MenuItemProvider {
    public menuId = 'emails';
    public icon = 'shortText';

    constructor(public store: NgSkysmackStore) { super(); }

    public getItems(menuId: string, packagePath: string): Observable<MenuItem[]> {
        if (this.menuId === menuId) {
            return this.store.getSkysmack().pipe(
                safeHasValue(),
                map((currentTenant: Skysmack) => currentTenant.packages
                    .filter((_package: Package) => _package.type === EmailsSmtpType.id && _package.dependencies.find(dep => dep === packagePath))
                    .map(_package => new MenuItem({
                        url: '/' + _package.path,
                        displayName: _package.name,
                        area: 'connected_packages',
                        order: 20,
                        icon: this.icon,
                    }))
                )
            );
        } else {
            return of([]);
        }
    }
}
