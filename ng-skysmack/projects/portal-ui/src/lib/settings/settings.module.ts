import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';

import { PortalUiModule } from './../portal-ui.module';
import { LanguageService } from './../language/language.service';
import { settingsComponents } from './components/settings-components';
import { HttpLoaderFactory } from './../portal-ui.helper';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        PortalUiModule
    ],
    declarations: [
        ...settingsComponents
    ],
    exports: [
        ...settingsComponents
    ],
    providers: [
        LanguageService,
        {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    ]
})
export class SettingsModule {
    constructor(public languageService: LanguageService) { }
}
