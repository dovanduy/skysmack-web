import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { take, map } from 'rxjs/operators';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { hasValue } from '@skysmack/framework';
import { Skysmack } from '@skysmack/packages-skysmack-core';

/**
 * Service responsible for setting the title that appears above the components and guide pages.
 */
@Injectable({ providedIn: 'root' })
export class EntityComponentPageTitle {
    public title: string;
    public show = true;
    public titleExtraTranslationString: string;
    private tenantTitle = 'Skysmack';

    constructor(
        private bodyTitle: Title,
        private store: NgSkysmackStore
    ) {
        this.setTenantTitle();
    }


    public setTitle(title: string, titleExtraTranslationString?: string, show: boolean = true, ) {
        this.show = show;
        this.title = title;
        this.titleExtraTranslationString = titleExtraTranslationString;
        this.setBodyTitle(title);
    }

    private setBodyTitle(title: string) {
        if (title !== '') {
            title = `${title} | `;
        }
        this.bodyTitle.setTitle(`${title}${this.tenantTitle}`);
    }

    private setTenantTitle() {
        this.store.getSkysmack().pipe(
            hasValue(),
            map((tenant: Skysmack) => {
                if (tenant !== undefined) {
                    return tenant;
                }
            }),
            map(tenant => {
                if (tenant.name) {
                    this.tenantTitle = tenant.name;
                }
            }),
            take(1)
        ).subscribe();
    }
}
