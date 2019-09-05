import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { StrIndex } from '@skysmack/framework';

declare const System: any;

export class SkysmackTranslateHttpLoader {
    public static i18nFiles: StrIndex<Observable<any>> = {};
    public http: any;
    public prefix: any;
    public suffix: any;

    constructor(http, prefix = '/assets/i18n/', suffix = '.json') {
        this.http = http;
        this.prefix = prefix;
        this.suffix = suffix;
    }
}

class SkysmackPortalTranslateHttpLoader extends SkysmackTranslateHttpLoader {
    getTranslation(lang: string) {
        if (!SkysmackPortalTranslateHttpLoader.i18nFiles[lang]) {
            SkysmackPortalTranslateHttpLoader.i18nFiles[lang] = from(System.import(`../../../../../apps/web/web-portal/src/i18n/${lang}${this.suffix}`));
        }
        return SkysmackPortalTranslateHttpLoader.i18nFiles[lang];
    }
}

class SkysmackCommercialTranslateHttpLoader extends SkysmackTranslateHttpLoader {
    getTranslation(lang: string) {
        if (!SkysmackCommercialTranslateHttpLoader.i18nFiles[lang]) {
            SkysmackCommercialTranslateHttpLoader.i18nFiles[lang] = from(System.import(`../../../../../apps/web/web-commercial/src/i18n/${lang}${this.suffix}`));
        }
        return SkysmackCommercialTranslateHttpLoader.i18nFiles[lang];
    }
}



// AoT requires an exported function for factories
export function PortalHttpLoaderFactory(http: HttpClient) {
    return new SkysmackPortalTranslateHttpLoader(http, 'i18n/')
}

export function CommercialHttpLoaderFactory(http: HttpClient) {
    return new SkysmackCommercialTranslateHttpLoader(http, 'i18n/')
}

