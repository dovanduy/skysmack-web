import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { settingsComponents } from './components/settings-components';
import { PortalUiModule } from '@skysmack/portal-ui';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        DynamicFormsModule,
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
