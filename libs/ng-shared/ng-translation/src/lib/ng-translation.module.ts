import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from './http-loader-factory';
import { LanguageService } from './language.service';
import { ReducerRegistry } from '@skysmack/redux';
import { translationReducer } from './redux/translation-reducers';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot(),
  ],
  declarations: [],
  exports: [
    TranslateModule
  ],
  providers: [
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  ]
})
export class NgTranslationModule {
  constructor(
    public languageService: LanguageService,
  ) {
    ReducerRegistry.Instance.register('translation', translationReducer);
  }
}
