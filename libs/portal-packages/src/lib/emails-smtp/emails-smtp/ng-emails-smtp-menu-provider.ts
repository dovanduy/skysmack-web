import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgEmailsSmtpMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'EMAILS_SMTP.INDEX.';

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
        if(componentKey === 'emails-smtp') {
            return of([
                new MenuItem({
                    url: 'settings/smtp-client',
                    displayName: this.translationPrefix + 'SETTINGS',
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