import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { PortalHttpLoaderFactory } from './http-loader-factory';
import { LanguageService } from './language.service';
import { ReducerRegistry } from '@skysmack/redux';
import { translationReducer } from './redux/translation-reducers';


export interface NgTranslationModuleConfig {

}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot(),
  ],
  declarations: [],
  exports: [
    TranslateModule
  ]
})
export class NgTranslationModule {
  constructor(
    public languageService: LanguageService,
  ) {
    ReducerRegistry.Instance.register('translation', translationReducer);
  }

  static forRoot(config): ModuleWithProviders {
    return {
      ngModule: NgTranslationModule,
      providers: [
        {
          provide: TranslateLoader,
          useFactory: PortalHttpLoaderFactory,
          deps: [HttpClient]
        }
      ]
    }
  }
}
