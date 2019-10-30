import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { PBX_3CXTypeId, PhonesTypeId } from '@skysmack/package-types';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getCombinedMenuEntries, getMenuEntries, setConnectedParentPackage, getConnectedPackageMenuEntries } from '@skysmack/ng-framework';
import { PBX_3CXIndexComponent } from './components/3cx-index/3cx-index.component';
import { PhonesIndexComponent } from '../phones/components';

@Injectable({ providedIn: 'root' })
export class Ng3CXMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private callDataTranslationPrefix = 'CALL_DATA_SETTINGS.INDEX.';

    constructor(
        private store: NgSkysmackStore,
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(
                packagePath,
                PBX_3CXTypeId,
                componentKey,
                PBX_3CXIndexComponent.COMPONENT_KEY,
                this.get3CXIndexMenuAreas,
                this.store
            )
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
            getMenuEntries<MenuItem>(
                packagePath,
                PBX_3CXTypeId,
                componentKey,
                PBX_3CXIndexComponent.COMPONENT_KEY,
                this.get3CXIndexMenuItems,
                this.store
            ),
            getConnectedPackageMenuEntries(
                packagePath,
                PBX_3CXTypeId,
                PhonesTypeId,
                componentKey,
                PhonesIndexComponent.COMPONENT_KEY,
                this.store
            )
        );
    };

    private get3CXIndexMenuAreas = (): MenuArea[] => {
        return [
            new MenuArea({
                area: 'settings',
                translationPrefix: this.callDataTranslationPrefix,
                order: 3
            })
        ];
    }

    private get3CXIndexMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'settings/call-data',
                displayName: this.callDataTranslationPrefix + 'CALL_DATA.SETTINGS',
                area: 'settings',
                order: 1,
                icon: 'group_add',
                permissions: [],
                providedIn: [SIDEBAR]
            }),
            setConnectedParentPackage(this.store, packagePath)
        ];
    }
}
