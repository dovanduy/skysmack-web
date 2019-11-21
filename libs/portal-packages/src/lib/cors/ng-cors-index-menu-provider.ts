import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, getCombinedMenuEntries } from '@skysmack/ng-framework';
import { CorsTypeId } from '@skysmack/package-types';
import { CorsIndexComponent } from './cors/components/cors-index/cors-index.component';
import { CorsPermissions } from '@skysmack/packages-cors';

@Injectable({ providedIn: 'root' })
export class NgCorsIndexMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private corsTranslationPrefix = 'CORS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(
                packagePath,
                CorsTypeId,
                componentKey,
                CorsIndexComponent.COMPONENT_KEY,
                this.getCorsMenuAreas,
                this.store
            )
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
            getMenuEntries<MenuItem>(
                packagePath,
                CorsTypeId,
                componentKey,
                CorsIndexComponent.COMPONENT_KEY,
                this.getCorsMenuItems,
                this.store
            )
        );
    };

    //#region Cors
    private getCorsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.corsTranslationPrefix,
                order: 2
            })
        ];
    };

    private getCorsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'settings',
                displayName: this.corsTranslationPrefix + 'SETTINGS',
                area: 'manage',
                order: 1,
                icon: 'add',
                permissions: [],
                providedIn: [SIDEBAR]
            })
        ];
    };
    //#endregion
}