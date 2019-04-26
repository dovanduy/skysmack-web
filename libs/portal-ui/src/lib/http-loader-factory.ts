import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { StrIndex } from '@skysmack/framework';
import { Observable } from 'rxjs';

declare const System: any;

class SkysmackTranslateHttpLoader {
    public static i18nFiles: StrIndex<Observable<any>> = {};
    public http: any;
    public prefix: any;
    public suffix: any;

    constructor(http, prefix = '/assets/i18n/', suffix = '.json') {
        this.http = http;
        this.prefix = prefix;
        this.suffix = suffix;
    }

    getTranslation(lang) {
        if (!SkysmackTranslateHttpLoader.i18nFiles[lang]) {
            SkysmackTranslateHttpLoader.i18nFiles[lang] = from(System.import(`../../../../apps/web/web-portal/src/i18n/${lang}${this.suffix}`));
        }
        return SkysmackTranslateHttpLoader.i18nFiles[lang];
    }
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new SkysmackTranslateHttpLoader(http, 'i18n/');
}
