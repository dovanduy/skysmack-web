import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { EmailsSmtpTypeId } from '@skysmack/package-types';
import { getMenuEntries } from '@skysmack/ng-framework';
import { EmailsSmtpIndexComponent } from './components/emails-smtp-index/emails-smtp-index.component';

@Injectable({ providedIn: 'root' })
export class NgEmailsSmtpMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'EMAILS_SMTP.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, EmailsSmtpTypeId, componentKey, EmailsSmtpIndexComponent.COMPONENT_KEY, this.getEmailsSmtpMenuAreas(), this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, EmailsSmtpTypeId, componentKey, EmailsSmtpIndexComponent.COMPONENT_KEY, this.getEmailsSmtpMenuItems(), this.store);
    };

    public getEmailsSmtpMenuAreas() {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 1
            })
        ];
    };

    public getEmailsSmtpMenuItems() {
        return [
            new MenuItem({
                url: 'settings/smtp-client',
                displayName: this.translationPrefix + 'SETTINGS',
                area: 'manage',
                order: 1,
                icon: 'groupAdd',
                permissions: [
                    //??
                ],
                providedIn: ['sidebar']
            })
        ];
    };
}