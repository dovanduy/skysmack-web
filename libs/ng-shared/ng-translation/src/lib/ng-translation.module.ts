import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LanguageService } from './language.service';
import { ReducerRegistry } from '@skysmack/redux';
import { translationReducer } from './redux/translation-reducers';
import { SkysmackTranslateHttpLoader } from './http-loader-factory';


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

  static forRoot(httpFactoryLoader: (http: HttpClient) => SkysmackTranslateHttpLoader): ModuleWithProviders {
    return {
      ngModule: NgTranslationModule,
      providers: [
        {
          provide: TranslateLoader,
          useFactory: httpFactoryLoader,
          deps: [HttpClient]
        }
      ]
    }
  }
}
