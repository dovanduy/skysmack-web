import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getCombinedMenuEntries, getMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { PhonesTypeId } from '@skysmack/package-types';
import { PhonesIndexComponent } from './phones/components/phones-index/phones-index.component';
import { PhonesPermissions } from '@skysmack/packages-phones';
import { PhoneLogsIndexComponent } from './phones-logs/components/phone-logs-index/phone-logs-index.component';
import { PhoneNumbersIndexComponent } from './phones-numbers/components/phone-numbers-index/phone-numbers-index.component';

@Injectable({ providedIn: 'root' })
export class NgPhonesMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private phoneTranslationPrefix = 'PHONES.INDEX.';
    private phoneLogsTranslationPrefix = 'PHONE_LOGS.INDEX.';
    private phoneNumbersTranslationPrefix = 'PHONE_NUMBERS.INDEX.';

    constructor(
        private store: NgSkysmackStore,
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(
                packagePath,
                PhonesTypeId,
                componentKey,
                PhonesIndexComponent.COMPONENT_KEY,
                this.getPhonesIndexMenuAreas,
                this.store
            ),
            getMenuEntries<MenuArea>(
                packagePath,
                PhonesTypeId,
                componentKey,
                PhoneLogsIndexComponent.COMPONENT_KEY,
                this.getPhoneLogsIndexMenuAreas,
                this.store
            ),
            getMenuEntries<MenuArea>(
                packagePath,
                PhonesTypeId,
                componentKey,
                PhoneNumbersIndexComponent.COMPONENT_KEY,
                this.getPhoneLogsIndexMenuAreas,
                this.store
            )
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
            getMenuEntries<MenuItem>(
                packagePath,
                PhonesTypeId,
                componentKey,
                PhonesIndexComponent.COMPONENT_KEY,
                this.getPhonesIndexMenuItems,
                this.store
            ),
            getMenuEntries<MenuItem>(
                packagePath,
                PhonesTypeId,
                componentKey,
                PhoneLogsIndexComponent.COMPONENT_KEY,
                this.getPhoneNumbersIndexMenuItems,
                this.store
            ),
            getMenuEntries<MenuItem>(
                packagePath,
                PhonesTypeId,
                componentKey,
                PhoneNumbersIndexComponent.COMPONENT_KEY,
                this.getPhoneNumbersIndexMenuItems,
                this.store
            )
        );
    };

    private getPhonesIndexMenuAreas = (): MenuArea[] => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.phoneTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.phoneTranslationPrefix,
                order: 2
            }),
            new MenuArea({
                area: 'settings',
                translationPrefix: this.phoneTranslationPrefix,
                order: 3
            })
        ];
    }

    private getPhonesIndexMenuItems = (): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.phoneTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    PhonesPermissions.addPhones
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            new MenuItem({
                url: 'logs',
                displayName: this.phoneTranslationPrefix + 'LOGS',
                area: 'manage',
                order: 2,
                icon: 'add',
                permissions: [
                    PhonesPermissions.findLogs
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            new MenuItem({
                url: 'numbers',
                displayName: this.phoneTranslationPrefix + 'NUMBERS',
                area: 'manage',
                order: 2,
                icon: 'add',
                permissions: [
                    PhonesPermissions.findPhoneNumbers
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            })
        ];
    }

    private getPhoneLogsIndexMenuAreas = (): MenuArea[] => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.phoneLogsTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.phoneTranslationPrefix,
                order: 2
            }),
        ];
    }

    private getPhoneLogsIndexMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.phoneLogsTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    PhonesPermissions.addPhones
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    }

    private getPhoneNumbersIndexMenuAreas = (): MenuArea[] => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.phoneNumbersTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.phoneTranslationPrefix,
                order: 2
            }),
        ];
    }

    private getPhoneNumbersIndexMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.phoneNumbersTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    PhonesPermissions.addPhoneNumbers
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    }
}

