import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, setConnectedParentPackage, getCombinedMenuEntries, getConnectedPackageMenuEntries } from '@skysmack/ng-framework';
import { EmailsSmtpTypeId, EmailsTypeId } from '@skysmack/package-types';
import { EmailsSmtpIndexComponent } from './components/emails-smtp-index/emails-smtp-index.component';
import { EmailsIndexComponent } from '../../emails/emails';

@Injectable({ providedIn: 'root' })
export class NgEmailsSmtpMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'EMAILS_SMTP.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(
            packagePath,
            EmailsSmtpTypeId,
            componentKey,
            EmailsSmtpIndexComponent.COMPONENT_KEY,
            this.getEmailsSmtpMenuAreas,
            this.store
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries(
            getMenuEntries<MenuItem>(
                packagePath,
                EmailsSmtpTypeId,
                componentKey,
                EmailsSmtpIndexComponent.COMPONENT_KEY,
                this.getEmailsSmtpMenuItems,
                this.store
            ),
            getConnectedPackageMenuEntries(
                packagePath,
                EmailsSmtpTypeId,
                EmailsTypeId,
                componentKey,
                EmailsIndexComponent.COMPONENT_KEY,
                this.store
            )
        );
    };

    public getEmailsSmtpMenuAreas = (): MenuArea[] => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 1
            }),
            this.getConnectedPackageMenuArea()
        ];
    };

    public getEmailsSmtpMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'settings/smtp-client',
                displayName: this.translationPrefix + 'SETTINGS',
                area: 'manage',
                order: 1,
                icon: 'group_add',
                permissions: [],
                providedIn: ['sidebar']
            }),
            setConnectedParentPackage(this.store, packagePath)
        ];
    };
}