import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, setConnectedParentPackage, getCombinedMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { EmailsTypeId } from '@skysmack/package-types';
import { EmailsIndexComponent } from './components/emails-index/emails-index.component';
import { EmailTemplatesIndexComponent } from '../email-templates/components/email-templates-index/email-templates-index.component';

@Injectable({ providedIn: 'root' })
export class NgEmailsIndexMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public EmailsTranslationPrefix = 'EMAILS.INDEX.';
    public EmailTemplatesTranslationPrefix = 'EMAIL_TEMPLATES.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(packagePath, EmailsTypeId, componentKey, EmailsIndexComponent.COMPONENT_KEY, this.getEmailsMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, EmailsTypeId, componentKey, EmailTemplatesIndexComponent.COMPONENT_KEY, this.getEmailTemplatesMenuAreas, this.store)
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
            getMenuEntries<MenuItem>(packagePath, EmailsTypeId, componentKey, EmailsIndexComponent.COMPONENT_KEY, this.getEmailsMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, EmailsTypeId, componentKey, EmailTemplatesIndexComponent.COMPONENT_KEY, this.getEmailTemplatesMenuItems, this.store)
        );
    };

    private getEmailsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.EmailsTranslationPrefix,
                order: 1
            })
        ]
    };
    
    public getEmailTemplatesMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.EmailTemplatesTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.EmailTemplatesTranslationPrefix,
                order: 2
            })
        ];
    };

    public getEmailsMenuItems = () => {
        return [
            new MenuItem({
                url: 'templates',
                displayName: this.EmailsTranslationPrefix + 'TEMPLATES',
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

    public getEmailTemplatesMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.EmailTemplatesTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    //??
                ],
                providedIn: ['sidebar', 'speedDial']
            }),
            setBackButton(packagePath)
        ];
    };
}