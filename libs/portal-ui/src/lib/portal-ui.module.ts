import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReducerRegistry, authenticationReducer } from '@skysmack/redux';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MaterialModule } from './material.module';
import { uiReducer } from './redux/ui-reducers';
import { standardSettingsReducer } from './redux/settings';
import { HttpLoaderFactory } from './http-loader-factory';
import { NgNotifications } from './notifications/ng-notifications';
import { NOTIFICATIONS_INJECTOR_TOKEN, CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { portailUiPipes } from './pipes/portal-ui-pipes';
import { LanguageService } from './language/language.service';
import { commonComponents } from './components/common/common-components';
import { displayComponents } from './components/display-components/display-components';
import { directives } from './directives/directives';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forRoot(),
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
    ...displayComponents
  ],
  exports: [
    TranslateModule,
    MaterialModule,
    ...commonComponents,
    ...displayComponents
  ],
  entryComponents: [
    ...displayComponents
  ]
})
export class PortalUiModule {
  constructor(
    public languageService: LanguageService,
    // Make entry components available
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver
  ) {
    ReducerRegistry.Instance.register('ui', uiReducer);
    ReducerRegistry.Instance.register('standardSettings', standardSettingsReducer);
    ReducerRegistry.Instance.register('authentication', authenticationReducer);

    // Make entry components available
    coalescingResolver.registerResolver(localResolver);
  }
}
