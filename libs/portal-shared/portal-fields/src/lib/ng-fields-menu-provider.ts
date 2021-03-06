import { Injectable } from '@angular/core';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable, of } from 'rxjs';
import { FieldsIndexComponent } from './management-components/fields-index/fields-index.component';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { setBackButton, getPreviousUrl$ } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgFieldsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'FIELD.INDEX.';
    public previousUrl: string;

    constructor(
        router: Router,
    ) {
        this.setPreviousUrl(router);
    }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        if (componentKey === FieldsIndexComponent.COMPONENT_KEY) {
            return of(this.getFieldsMenuAreas());
        } else {
            return of([]);
        }
    };

    public getMenuItems = (packagePath: string, componentKey: string): Observable<MenuItem[]> => {
        if (componentKey === FieldsIndexComponent.COMPONENT_KEY) {
            return of(this.getFieldsMenuItems(packagePath)).pipe(
                map(menuItems => this.setConditionalBackButton(packagePath, menuItems, this.previousUrl))
            );
        } else {
            return of([]);
        }
    };

    private getFieldsMenuAreas = () => {
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

    private getFieldsMenuItems = (packagePath: string) => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    altKey: true,
                    action: `/${packagePath}/fields/create`
                },
                order: 1,
                icon: 'add',
                permissions: [
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            })
        ];
    }

    // Note: This doesn't need to be unsubscribed.
    private setPreviousUrl(router: Router) {
        getPreviousUrl$(router).pipe(tap(x => this.previousUrl = x)).subscribe();
    }

    private setConditionalBackButton = (packagePath: string, menuItems: MenuItem[], previousUrl: string): MenuItem[] => {
        if (previousUrl) {
            return menuItems.concat(setBackButton(previousUrl));
        }
        return menuItems.concat(setBackButton(packagePath));
    }
}