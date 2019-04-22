import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PortalUiModule } from './../portal-ui.module';
import { LanguageService } from './../language/language.service';
import { settingsComponents } from './components/settings-components';

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
        LanguageService
    ]
})
export class SettingsModule {
    constructor() { }
}
