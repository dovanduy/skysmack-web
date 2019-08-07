import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, FieldsId } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { PersonsPermissions } from '@skysmack/packages-persons';
import { getMenuEntries, setBackButtonV2 } from '@skysmack/ng-framework';
import { FieldsIndexComponent } from './management-components/fields-index/fields-index.component';



@Injectable({ providedIn: 'root' })
export class NgFieldsMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'FIELDS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, FieldsId, componentKey, FieldsIndexComponent.COMPONENT_KEY, this.getFieldsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, FieldsId, componentKey, FieldsIndexComponent.COMPONENT_KEY, this.getFieldsMenuItems, this.store);
    };

    public getFieldsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.translationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ];
    }
// packagePath: string, additionalPaths: string[]
    public getFieldsMenuItems = () => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    PersonsPermissions.addPersons
                ],
                providedIn: ['sidebar', 'speedDial']
            }),
            // setBackButtonV2(`/${packagePath}/${additionalPaths.join('/')}`)
        ];
    }
}