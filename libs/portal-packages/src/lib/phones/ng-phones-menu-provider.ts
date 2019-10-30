import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getCombinedMenuEntries, getMenuEntries } from '@skysmack/ng-framework';
import { PhonesTypeId } from '@skysmack/package-types';
import { PhonesIndexComponent } from './phones/components/phones-index/phones-index.component';
import { PhonesPermissions } from '@skysmack/packages-phones';

@Injectable({ providedIn: 'root' })
export class NgPhonesMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private phoneTranslationPrefix = 'PHONES.INDEX.';

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
            })
        ];
    }
}
