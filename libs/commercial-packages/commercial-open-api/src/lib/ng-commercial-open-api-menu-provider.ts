import { Injectable } from '@angular/core';
import { MenuProvider, MenuArea, MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgCommercialOpenApiMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'COMMERCIAL_OPEN_API.INDEX.';

    constructor(
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return of(this.getOpenAPIMenuAreas());
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return of(this.getOpenAPIMenuItems());
    };

    private getOpenAPIMenuAreas = (): MenuArea[] => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ];
    }

    private getOpenAPIMenuItems = (): MenuItem[] => {
        return [
            new MenuItem({
                url: '/open-api',
                displayName: this.translationPrefix + 'OPEN_API',
                area: 'manage',
                order: 1,
                icon: 'add',
                providedIn: ['top']
            })
        ];
    }
}