import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReducerRegistry, authenticationReducer } from '@skysmack/redux';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { uiReducer } from './redux/ui-reducers';
import { standardSettingsReducer } from './redux/settings';
import { NgNotifications } from './notifications/ng-notifications';
import { NOTIFICATIONS_INJECTOR_TOKEN, CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { NgUIModule } from '@skysmack/ng-ui';
import { NgTranslationModule, LanguageService } from '@skysmack/ng-translation';
import { portailUiPipes } from './pipes/portal-ui-pipes';
import { commonComponents } from './components/common/common-components';
import { displayComponents } from './components/display-components/display-components';
import { directives } from './directives/directives';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgTranslationModule,
    NgUIModule,
    MaterialModule // Must come after BrowserAnimationsModule
  ],
  providers: [
    LanguageService,
    { provide: NOTIFICATIONS_INJECTOR_TOKEN, useClass: NgNotifications }
  ],
  declarations: [
    ...directives,
    ...portailUiPipes,
    ...commonComponents,
    ...displayComponents
  ],
  exports: [
    NgTranslationModule,
    NgUIModule,
    MaterialModule,
    ...directives,
    ...commonComponents,
    ...displayComponents
  ],
  entryComponents: [
    ...displayComponents
  ]
})
export class PortalUiModule {
  constructor(
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
