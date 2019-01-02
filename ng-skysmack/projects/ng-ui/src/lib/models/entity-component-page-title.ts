import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { take, map } from 'rxjs/operators';
import { NgSkysmackStore } from './../../ng-packages/skysmack/redux/ng-skysmack-store';
import { hasValue } from '@skysmack/framework';
import { Skysmack } from '@skysmack/packages-skysmack';

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

    constructor(private translate: TranslateService, private bodyTitle: Title, private store: NgSkysmackStore) {
        this.store.getSkysmack().pipe(hasValue<Skysmack>(), map(tenant => { if (tenant !== undefined) { return tenant; } }), take(1)).subscribe(tenant => {
            if (tenant.name) {
                this.tenantTitle = tenant.name;
            }
        });
        translate.onLangChange.subscribe(() => {
            if (this.translateTitle) {
                this.setTranslatedTitle();
            }
        });
    }

    public setTitle(_title: string, translate: boolean = false, show: boolean = true) {
        this.show = show;

        if (translate) {
            this.titleTranslation = _title;
            this.translateTitle = translate;
            this.setTranslatedTitle();
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

    private setTranslatedTitle() {
        this.translate.get(this.titleTranslation).pipe(take(1)).subscribe((title: string) => {
            this.title = title;
            this.setBodyTitle(title);
        });
    }
}
