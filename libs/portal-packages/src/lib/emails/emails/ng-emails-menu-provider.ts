import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgEmailsIndexMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'EMAILS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return of([
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 1
            })
        ])
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        if(componentKey === 'emails-index') {
            return of([
                new MenuItem({
                    url: 'templates',
                    displayName: this.translationPrefix + 'TEMPLATES',
                    area: 'manage',
                    order: 1,
                    icon: 'groupAdd',
                    permissions: [
                        //??
                    ],
                    providedIn: ['sidebar']
                })
            ]);
        } else {
           return of([]);
        }
    };
}