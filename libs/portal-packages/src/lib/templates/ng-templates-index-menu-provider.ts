import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, getCombinedMenuEntries } from '@skysmack/ng-framework';
import { TemplatesTypeId } from '@skysmack/package-types';
import { TemplatesIndexComponent } from './templates/components/templates-index/templates-index.component';
import { TemplatesPermissions } from '@skysmack/packages-templates';

@Injectable({ providedIn: 'root' })
export class NgTemplatesIndexMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private templatesTranslationPrefix = 'TEMPLATES.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(
                packagePath,
                TemplatesTypeId,
                componentKey,
                TemplatesIndexComponent.COMPONENT_KEY,
                this.getTemplatesMenuAreas,
                this.store
            )
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
            getMenuEntries<MenuItem>(
                packagePath,
                TemplatesTypeId,
                componentKey,
                TemplatesIndexComponent.COMPONENT_KEY,
                this.getTemplatesMenuItems,
                this.store
            )
        );
    };

    //#region Templates
    private getTemplatesMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.templatesTranslationPrefix,
                order: 1
            })
        ];
    };

    private getTemplatesMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.templatesTranslationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    shiftKey: true,
                    action: `/${packagePath}/create`
                },
                order: 1,
                icon: 'add',
                permissions: [
                    TemplatesPermissions.addTemplates
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            })
        ];
    };
    //#endregion
}