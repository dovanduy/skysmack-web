import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map, debounceTime } from 'rxjs/operators';
import { TranslationRedux } from './redux/translation-redux';

@Injectable()
export class LanguageService {
    public languages = ['en', 'da'];
    public configured = false;

    constructor(
        public translateService: TranslateService,
        public translationRedux: TranslationRedux
    ) {
        this.configure();
    }

    public configure() {
        if (!this.configured) {
            this.configured = true;
            this.translateService.addLangs(this.languages);
            this.translateService.setDefaultLang('en');
            return this.translationRedux.getLanguage().pipe(
                debounceTime(100), // Prevents excessive emission
                map(language => {
                    if (language && language.length > 0) {
                        this.translateService.use(language);
                    } else {
                        const browserLang = this.translateService.getBrowserLang().toLowerCase();
                        this.translateService.use(this.languages.find(lang => lang === browserLang) ? browserLang : 'en');
                    }
                })).subscribe();
        }
    }
}
