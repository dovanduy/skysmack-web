import { Injectable, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { take, map, switchMap, startWith } from 'rxjs/operators';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { hasValue, SubscriptionHandler } from '@skysmack/framework';
import { Skysmack } from '@skysmack/packages-skysmack-core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Service responsible for setting the title that appears above the components and guide pages.
 */
@Injectable({ providedIn: 'root' })
export class EntityComponentPageTitle implements OnDestroy {

    public title: string;
    public show = true;
    public titleExtraTranslationString: string;
    public subscriptionHandler = new SubscriptionHandler();
    private tenantTitle = 'Skysmack';

    constructor(
        private bodyTitle: Title,
        private store: NgSkysmackStore,
        private transLateService: TranslateService
    ) {
        this.setTenantTitle();
    }

    public ngOnDestroy(): void {
        this.subscriptionHandler.unsubscribe();
    }

    public setTitle(title: string, titleExtraTranslationString?: string, show: boolean = true, ) {
        this.show = show;

        this.subscriptionHandler.register(this.transLateService.onLangChange.pipe(
            startWith(null), // Ensures title is set on start up
            switchMap(() => this.transLateService.get(title).pipe(
                map(translatedTitle => {
                    this.title = translatedTitle;
                    this.titleExtraTranslationString = titleExtraTranslationString;
                    this.setBodyTitle(translatedTitle);
                })
            ))
        ).subscribe());
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
