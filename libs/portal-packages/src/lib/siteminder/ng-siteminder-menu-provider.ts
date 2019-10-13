import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { SiteMinderTypeId } from '@skysmack/package-types';
import { getMenuEntries } from '@skysmack/ng-framework';
import { SiteMinderIndexComponent } from './siteminder/components/siteminder-index/siteminder-index.component';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'SITE_MINDER.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, SiteMinderTypeId, componentKey, SiteMinderIndexComponent.COMPONENT_KEY, this.getSiteMinderMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, SiteMinderTypeId, componentKey, SiteMinderIndexComponent.COMPONENT_KEY, this.getSiteMinderMenuItems, this.store);
    };

    private getSiteMinderMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ];
    }

    private getSiteMinderMenuItems = () => {
        return [
        ];
    }
}