import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReducerRegistry, authenticationReducer } from '@skysmack/redux';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { RecurringExpressionFieldModule } from './components/field-components/components/recurring-expression-field/recurring-expression-field.module';
import { MaterialModule } from './material.module';
import { uiReducer } from './redux/ui-reducers';
import { standardSettingsReducer } from './redux/settings';
import { HttpLoaderFactory } from './http-loader-factory';
import { NgNotifications } from './notifications/ng-notifications';
import { ValidatorsFieldModule } from './components/field-components/components/validators-field/validators-field.module';
import { NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-redux';
import { portailUiPipes } from './pipes/portal-ui-pipes';
import { LanguageService } from './language/language.service';
import { commonComponents } from './components/common/common-components';
import { fieldComponents } from './components';
import { displayComponents } from './components/display-components/display-components';
import { directives } from './directives';
import { ValidatorsFieldComponent } from './components/field-components/components/validators-field/validators-field.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
    RecurringExpressionFieldModule,
    ValidatorsFieldModule,
    MaterialModule // Must come after BrowserAnimationsModule
  ],
  providers: [
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    },
    {
      provide: NOTIFICATIONS_INJECTOR_TOKEN, useClass: NgNotifications
    }
  ],
  declarations: [
    ...directives,
    ...portailUiPipes,
    ...commonComponents,
    ...fieldComponents,
    ...displayComponents
  ],
  exports: [
    TranslateModule,
    MaterialModule,
    ...commonComponents,
    ...fieldComponents,
    ...displayComponents
  ],
  entryComponents: [
    ...fieldComponents,
    ...displayComponents,
    ValidatorsFieldComponent
  ]
})
export class PortalUiModule {
  constructor(public languageService: LanguageService) {
    ReducerRegistry.Instance.register('ui', uiReducer);
    ReducerRegistry.Instance.register('standardSettings', standardSettingsReducer);
    ReducerRegistry.Instance.register('authentication', authenticationReducer);
  }
}
