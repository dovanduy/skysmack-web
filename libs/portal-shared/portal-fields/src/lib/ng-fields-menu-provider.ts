import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable, of } from 'rxjs';
import { PersonsPermissions } from '@skysmack/packages-persons';
import { getMenuEntries, setBackButton, getAdditionalPaths } from '@skysmack/ng-framework';
import { FieldsIndexComponent } from './management-components/fields-index/fields-index.component';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class NgFieldsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'FIELDS.INDEX.';

    constructor(
        public store: NgSkysmackStore,
        public router: Router
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        if (componentKey === FieldsIndexComponent.COMPONENT_KEY) {
            return of(this.getFieldsMenuAreas());
        } else {
            return of([]);
        }
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        if (componentKey === FieldsIndexComponent.COMPONENT_KEY) {
            return of(this.getFieldsMenuItems(packagePath));
        } else {
            return of([]);
        }
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

    public getFieldsMenuItems = (packagePath: string) => {
        const additionalPaths = getAdditionalPaths(this.router, packagePath);
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(`/${packagePath}/${additionalPaths.join('/')}`)
        ];
    }
}