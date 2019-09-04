import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { StrIndex } from '@skysmack/framework';

declare const System: any;

class SkysmackTranslateHttpLoader {
    public static i18nFiles: StrIndex<Observable<any>> = {};

    constructor(
        private http,
        private i18nFolderPath: string,
        private prefix = '/assets/i18n/',
        private suffix = '.json'
    ) { }

    getTranslation(lang: string) {
        if (!SkysmackTranslateHttpLoader.i18nFiles[lang]) {
            SkysmackTranslateHttpLoader.i18nFiles[lang] = from(System.import(`../../../../../apps/${this.i18nFolderPath}/${lang}${this.suffix}`));
        }
        return SkysmackTranslateHttpLoader.i18nFiles[lang];
    }
}

// AoT requires an exported function for factories
export function PortalHttpLoaderFactory(http: HttpClient, i18nFolderPath: string) {
    return new SkysmackTranslateHttpLoader(http, 'web/web-portal/src/i18n', 'i18n/');
}

export function CommercialHttpLoaderFactory(http: HttpClient, i18nFolderPath: string) {
    return new SkysmackTranslateHttpLoader(http, i18nFolderPath, 'i18n/');
}

