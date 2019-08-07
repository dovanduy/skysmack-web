import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, setConnectedParentPackage } from '@skysmack/ng-framework';
import { EmailsTypeId } from '@skysmack/package-types';
import { EmailsIndexComponent } from './components/emails-index/emails-index.component';

@Injectable({ providedIn: 'root' })
export class NgEmailsIndexMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'EMAILS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, EmailsTypeId, componentKey, EmailsIndexComponent.COMPONENT_KEY, this.getEmailsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, EmailsTypeId, componentKey, EmailsIndexComponent.COMPONENT_KEY, this.getEmailsMenuItems, this.store);
    };

    public getEmailsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 1
            })
        ]
    };

    public getEmailsMenuItems = () => {
        return [
            new MenuItem({
                url: 'templates',
                displayName: this.translationPrefix + 'TEMPLATES',
                area: 'manage',
                order: 1,
                icon: 'group_add',
                permissions: [
                    //??
                ],
                providedIn: ['sidebar']
            })
        ];
    };
}