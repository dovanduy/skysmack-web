import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReducerRegistry, authenticationReducer } from '@skysmack/redux';
import { RouterModule } from '@angular/router';
import { uiReducer } from './redux/ui-reducers';
import { standardSettingsReducer } from './redux/settings';
import { NgNotifications } from './notifications/ng-notifications';
import { NOTIFICATIONS_INJECTOR_TOKEN, CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { NgUIModule } from '@skysmack/ng-ui';
import { NgTranslationModule, LanguageService, PortalHttpLoaderFactory } from '@skysmack/ng-translation';
import { portailUiPipes } from './pipes/portal-ui-pipes';
import { commonComponents } from './components/common/common-components';
import { displayComponents } from './components/display-components/display-components';
import { directives } from './directives/directives';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

const material = [
  MatSidenavModule,
  MatMenuModule,
  MatIconModule,
  ScrollDispatchModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatProgressBarModule
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgTranslationModule.forRoot(PortalHttpLoaderFactory),
    NgUIModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ...material
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
    ...material,
    ...directives,
    ...commonComponents,
    ...displayComponents,
    ...portailUiPipes
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
