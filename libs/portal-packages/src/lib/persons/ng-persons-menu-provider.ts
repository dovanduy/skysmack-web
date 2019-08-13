import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { PersonsPermissions } from '@skysmack/packages-persons';
import { PersonsTypeId } from '@skysmack/package-types';
import { getMenuEntries } from '@skysmack/ng-framework';
import { PersonsIndexComponent } from './persons/components/persons-index/persons-index.component';



@Injectable({ providedIn: 'root' })
export class NgPersonsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'PERSONS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, PersonsTypeId, componentKey, PersonsIndexComponent.COMPONENT_KEY, this.getPersonsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, PersonsTypeId, componentKey, PersonsIndexComponent.COMPONENT_KEY, this.getPersonsMenuItems, this.store);
    };

    public getPersonsMenuAreas = () => {
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

    public getPersonsMenuItems = () => {
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
                providedIn: ['sidebar', SPEEDDIAL]
            }),
            new MenuItem({
                url: 'fields',
                displayName: this.translationPrefix + 'FIELDS',
                area: 'manage',
                order: 2,
                icon: 'short_text',
                permissions: [
                    PersonsPermissions.findPersonsFields
                ],
                providedIn: ['sidebar']
            })
        ];
    }
}