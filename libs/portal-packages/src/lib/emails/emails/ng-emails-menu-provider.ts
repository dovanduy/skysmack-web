import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries } from '@skysmack/ng-framework';
import { EmailsTypeId } from '@skysmack/package-types';
import { EmailsIndexComponent } from './components/emails-index/emails-index.component';

@Injectable({ providedIn: 'root' })
export class NgEmailsIndexMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'EMAILS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, EmailsTypeId, componentKey, EmailsIndexComponent.COMPONENT_KEY, this.getEmailsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, EmailsTypeId, componentKey, EmailsIndexComponent.COMPONENT_KEY, this.getEmailsMenuItems, this.store);
    };

    private getEmailsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 1
            })
        ]
    };

    private getEmailsMenuItems = () => {
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
                providedIn: [SIDEBAR]
            })
        ];
    };
}