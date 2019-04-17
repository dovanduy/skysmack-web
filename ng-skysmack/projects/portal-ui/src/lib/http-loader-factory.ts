import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { StrIndex } from '@skysmack/framework';

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
            SkysmackTranslateHttpLoader.i18nFiles[lang] = this.http.get(`${this.prefix}${lang}${this.suffix}`).pipe(shareReplay(1));
        }
        return SkysmackTranslateHttpLoader.i18nFiles[lang];
    }
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new SkysmackTranslateHttpLoader(http, 'i18n/');
}
