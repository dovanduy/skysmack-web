import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { settingsComponents } from './components/settings-components';
import { NgDynamicFormsModule } from '@skysmack/ng-dynamic-forms';
import { PortalUiModule } from '@skysmack/portal-ui';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        NgDynamicFormsModule,
        PortalUiModule
    ],
    declarations: [
        ...settingsComponents
    ],
    exports: [
        ...settingsComponents
    ],
    providers: []
})
export class SettingsModule {
    constructor() { }
}
