import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { SkysmackIndexComponent } from './components';
import { SkysmackRoutingModule } from './skysmack-routing.module';
import { NgSkysmackModule } from '@skysmack/ng-core';
import { NgSkysmackSettingsFieldsConfig } from './ng-skysmack-settings-fields-config';
import { SettingsModule, PortalUiModule } from '@skysmack/portal-ui';

@NgModule({
  imports: [
    PortalUiModule,
    SettingsModule,
    CommonModule,
    HttpClientModule,
    SkysmackRoutingModule,
    NgSkysmackModule
  ],
  exports: [],
  declarations: [SkysmackIndexComponent],
  providers: [
    { provide: 'NgSkysmackSettingsFieldsConfig', useClass: NgSkysmackSettingsFieldsConfig },
  ],
})
export class SkysmackModule { }
