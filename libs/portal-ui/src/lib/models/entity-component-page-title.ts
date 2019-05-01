import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
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

    private titleTranslation = '';
    private translateTitle = false;

    private tenantTitle = 'Skysmack';

    constructor(
        private translate: TranslateService,
        private bodyTitle: Title,
        private store: NgSkysmackStore
    ) {
        this.setTenantTitle();
    }


    public setTitle(_title: string, translate: boolean = false, show: boolean = true) {
        this.show = show;

        if (translate) {
            this.titleTranslation = _title;
            this.translateTitle = translate;
            // TODO: Ensure the title gets translated.
            // Ensure below chunck is only called in constructor if used.
            // this.translate.onLangChange.subscribe(() => {
            //     // Translate title???
            // });
        } else {
            this.translateTitle = translate;
            this.title = _title;
            this.setBodyTitle(_title);
        }
    }

    private setBodyTitle(_title: string) {
        if (_title !== '') {
            _title = `${_title} | `;
        }
        this.bodyTitle.setTitle(`${_title}${this.tenantTitle}`);
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
