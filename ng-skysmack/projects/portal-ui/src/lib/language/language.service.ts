import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StandardSettingsRedux } from './../redux/settings/standard-settings-redux';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class LanguageService {
    public languages = ['en', 'da'];
    public configured = false;

    constructor(
        public translateService: TranslateService,
        public settingsRedux: StandardSettingsRedux
    ) {
        this.configure();
    }

    public configure() {
        if (!this.configured) {
            this.configured = true;
            this.translateService.addLangs(this.languages);
            this.translateService.setDefaultLang('en');
            return this.settingsRedux.getSettings().pipe(map(settings => {
                if (settings.language.length > 0) {
                    this.translateService.use(settings.language);
                } else {
                    const browserLang = this.translateService.getBrowserLang().toLowerCase();
                    this.translateService.use(this.languages.find(lang => lang === browserLang) ? browserLang : 'en');
                }
            })).subscribe();
        }
    }
}
