import { Injectable, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SubscriptionLike, Observable } from 'rxjs';
import { SettingsRedux } from '../redux/settings/settings-redux';

@Injectable({ providedIn: 'root' })
export class LanguageService implements OnDestroy {
    public subscriptions: SubscriptionLike[] = [];
    public languages = ['en', 'da'];
    public configured = false;

    constructor(
        public translate: TranslateService,
        public settingsRedux: SettingsRedux
    ) { }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    public configure() {
        if (!this.configured) {
            this.translate.addLangs(this.languages);
            this.translate.setDefaultLang('en');

            this.subscriptions.push(this.settingsRedux.getSettings().subscribe(settings => {
                if (settings.language.length > 0) {
                    this.translate.use(settings.language);
                } else {
                    const browserLang = this.translate.getBrowserLang().toLowerCase();
                    this.translate.use(this.languages[browserLang] ? browserLang : 'en');
                }
            }));

            this.configured = true;
        }
    }
}
