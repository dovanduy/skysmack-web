import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { setBackButton, getMenuEntries } from '@skysmack/ng-framework';
import { EmailsTypeId } from '@skysmack/package-types';
import { EmailTemplatesIndexComponent } from './components/email-templates-index/email-templates-index.component';

@Injectable({ providedIn: 'root' })
export class NgEmailsTemplatesMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'EMAILS_TEMPLATES.INDEX3.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, EmailsTypeId, componentKey, EmailTemplatesIndexComponent.COMPONENT_KEY, this.getEmailTemplatesMenuAreas(), this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, EmailsTypeId, componentKey, EmailTemplatesIndexComponent.COMPONENT_KEY, this.getEmailTemplatesMenuItems(), this.store);
    };

    public getEmailTemplatesMenuAreas() {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.translationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ];
    };

    public getEmailTemplatesMenuItems() {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    //??
                ],
                providedIn: ['sidebar', 'speedDial']
            })
        ];
        //.pipe(setBackButton({ customPath: '/emails' }));
    };
}