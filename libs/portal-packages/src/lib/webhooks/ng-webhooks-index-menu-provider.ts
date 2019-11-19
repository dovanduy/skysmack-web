import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, getCombinedMenuEntries } from '@skysmack/ng-framework';
import { WebhooksTypeId } from '@skysmack/package-types';
import { WebhooksIndexComponent } from './webhooks/components/webhooks-index/webhooks-index.component';
import { WebhooksPermissions } from '@skysmack/packages-webhooks';

@Injectable({ providedIn: 'root' })
export class NgWebhooksIndexMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private webhooksTranslationPrefix = 'WEBHOOKS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(
                packagePath,
                WebhooksTypeId,
                componentKey,
                WebhooksIndexComponent.COMPONENT_KEY,
                this.getWebhooksMenuAreas,
                this.store
            )
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
            getMenuEntries<MenuItem>(
                packagePath,
                WebhooksTypeId,
                componentKey,
                WebhooksIndexComponent.COMPONENT_KEY,
                this.getWebhooksMenuItems,
                this.store
            )
        );
    };

    //#region Webhooks
    private getWebhooksMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.webhooksTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.webhooksTranslationPrefix,
                order: 2
            })
        ];
    };

    private getWebhooksMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.webhooksTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    WebhooksPermissions.addWebhooks
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            })
        ];
    };
    //#endregion
}