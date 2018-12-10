import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgPersonsModule } from './../../ng-packages/persons';
import { PortalUiModule, HttpLoaderFactory } from 'lib/portal-ui/portal-ui.module';
import { personsComponents } from './components/persons-components';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'lib/portal-ui/language/language.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    PersonsRoutingModule,
    NgPersonsModule,
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
    ...personsComponents
  ],
  providers: []
})
export class PersonsModule {
  constructor(
    public languageService: LanguageService,
    public translateService: TranslateService
  ) {
    this.languageService.settingsRedux.getSettings().subscribe(settings => this.translateService.use(settings.language));
  }
}
