import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgProductsModule } from '@skysmack/ng-packages';
import { PortalUiModule, HttpLoaderFactory } from '@skysmack/portal-ui';
import { productsComponents } from './components/products-components';
import { productTypesComponents } from './components/product-types-component';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@skysmack/portal-ui';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ProductsRoutingModule,
    NgProductsModule,
    PortalUiModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  exports: [],
  declarations: [
    ...productsComponents,
    ...productTypesComponents
  ],
  providers: [],
})
export class ProductsModule {
  constructor(
    public languageService: LanguageService,
    public translateService: TranslateService
  ) {
    this.languageService.settingsRedux.getSettings().subscribe(settings => this.translateService.use(settings.language));
  }
}
