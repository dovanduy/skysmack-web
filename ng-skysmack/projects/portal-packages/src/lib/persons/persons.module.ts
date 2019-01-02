import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgPersonsModule } from '@skysmack/ng-packages';
import { PortalUiModule, HttpLoaderFactory } from '@skysmack/portal-ui';
import { personsComponents } from './components/persons-components';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@skysmack/portal-ui';

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
