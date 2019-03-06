import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketsRoutingModule } from './baskets-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgBasketsModule } from '@skysmack/ng-packages';
import { PortalUiModule, HttpLoaderFactory, FieldsModule } from '@skysmack/portal-ui';
import { basketsComponents } from './components/baskets-components';
import { TranslateLoader } from '@ngx-translate/core';
import { LanguageService } from '@skysmack/portal-ui';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    BasketsRoutingModule,
    NgBasketsModule,
    FieldsModule
  ],
  declarations: [
    ...basketsComponents
  ],
  providers: [{
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }]
})
export class BasketsModule {
  constructor(public languageService: LanguageService) { }
}
