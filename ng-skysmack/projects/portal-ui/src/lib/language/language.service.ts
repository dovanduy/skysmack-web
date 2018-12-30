import { Injectable, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SubscriptionLike } from 'rxjs';
import { SettingsRedux } from '../redux/settings/settings-redux';

@Injectable({ providedIn: 'root' })
export class LanguageService implements OnDestroy {
    public subscriptions: SubscriptionLike[] = [];
    public languages = ['en', 'da'];
    public configured = false;

    constructor(
        public translateService: TranslateService,
        public settingsRedux: SettingsRedux
    ) { }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    public configure() {
        if (!this.configured) {
            this.translateService.addLangs(this.languages);
            this.translateService.setDefaultLang('en');

            this.subscriptions.push(this.settingsRedux.getSettings().subscribe(settings => {
                if (settings.language.length > 0) {
                    this.translateService.use(settings.language);
                } else {
                    const browserLang = this.translateService.getBrowserLang().toLowerCase();
                    this.translateService.use(this.languages[browserLang] ? browserLang : 'en');
                }
            }));

            this.configured = true;
        }
    }
}
