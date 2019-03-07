import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReducerRegistry, authenticationReducer, fieldReducer } from '@skysmack/redux';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { RecurringExpressionFieldModule } from './components/field-components/components/recurring-expression-field/recurring-expression-field.module';
import { CalendarComponent } from './components/common/calendar/calendar.component';
import { DropDownBlockComponent } from './components/common/dropdown-block/dropdown-block.component';
import { SidebarMenuComponent } from './components/common/sidebar-menu/sidebar-menu.component';
import { LanguageSelectComponent } from './components/common/language-select/language-select.component';
import { OnlineStatusComponent } from './components/common/online-status/online-status.component';
import { PackageDrawerComponent } from './components/common/package-drawer/package-drawer.component';
import { PaginationComponent } from './components/common/pagination/pagination.component';
import { ProgressComponent } from './components/common/progress/progress.component';
import { NavBarComponent } from './components/common/navbar/navbar.component';
import { ContainerComponent } from './components/common/container/container.component';
import { CardBodyComponent } from './components/common/card-body/card-body.component';
import { DynamicFormComponent } from './components/field-components/dynamic-form/dynamic-form.component';
import { DynamicFormFieldComponent } from './components/field-components/dynamic-form-field/dynamic-form-field.component';
import { CheckboxFieldComponent } from './components/field-components/components/checkbox-field/checkbox-field.component';
import { DateFieldComponent } from './components/field-components/components/date-field/date-field.component';
import { DateTimeFieldComponent } from './components/field-components/components/date-time-field/date-time-field.component';
import { DecimalFieldComponent } from './components/field-components/components/decimal-field/decimal-field.component';
import { DoubleFieldComponent } from './components/field-components/components/double-field/double-field.component';
import { EmailFieldComponent } from './components/field-components/components/email-field/email-field.component';
import { GeographyFieldComponent } from './components/field-components/components/geography-field/geography-field.component';
import { HiddenFieldComponent } from './components/field-components/components/hidden-field/hidden-field.component';
import { IntFieldComponent } from './components/field-components/components/int-field/int-field.component';
import { LimitedStringFieldComponent } from './components/field-components/components/limited-string-field/limited-string-field.component';
import { PasswordFieldComponent } from './components/field-components/components/password-field/password-field.component';
import { SelectFieldComponent } from './components/field-components/components/select-field/select-field.component';
import { StringFieldComponent } from './components/field-components/components/string-field/string-field.component';
import { TimeFieldComponent } from './components/field-components/components/time-field/time-field.component';
import { PageHeaderComponent } from './components/common/page-header/page-header.component';
import { SpeedDialFabComponent } from './components/common/speed-dial-fab/speed-dial-fab.component';

import { MaterialModule } from './material.module';
import { uiReducer } from './redux/ui-reducers';
import { standardSettingsReducer } from './redux/settings';

import { PackageDependenciesFieldComponent } from './components/field-components/components/package-dependencies-field/package-dependencies-field.component';
import { QueueComponent } from './components/common/queue/queue.component';
import { HttpLoaderFactory } from './portal-ui.helper';
import { ShowEntityActionDirective } from './directives/show-entity-action.directive';
import { IsAuthenticatedDirective } from './autentication/is-authenticated.directive';
import { IsAnonymousDirective } from './autentication/is-anonymous.directive';
import { NgNotifications } from './notifications/ng-notifications';
import { RecordsContainerComponent } from './components/common/records-container/records-container.component';
import { AvailablePermissionsFieldComponent } from './components/field-components/components/available-permissions-field/available-permissions-field.component';
import { ValidatorsFieldModule } from './components/field-components/components/validators-field/validators-field.module';
import { FieldPermissionFieldComponent } from './components/field-components/components/field-permission-field/field-permission-field.component';
import { RolesSelectComponent } from './components/common/roles-select/roles-select.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
    // Note: Below setup works with ng-packgr (running ng build portal-ui)
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
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
      provide: 'Notifications', useClass: NgNotifications
    }
  ],
  declarations: [
    // Directives
    ShowEntityActionDirective,
    IsAuthenticatedDirective,
    IsAnonymousDirective,
    // Components
    CalendarComponent,
    DropDownBlockComponent,
    SidebarMenuComponent,
    LanguageSelectComponent,
    OnlineStatusComponent,
    PackageDrawerComponent,
    PaginationComponent,
    ProgressComponent,
    NavBarComponent,
    QueueComponent,
    RecordsContainerComponent,
    RolesSelectComponent,
    // Crud
    ContainerComponent,
    CardBodyComponent,
    // Fields
    DynamicFormComponent,
    DynamicFormFieldComponent,
    CheckboxFieldComponent,
    DateFieldComponent,
    DateTimeFieldComponent,
    DecimalFieldComponent,
    DoubleFieldComponent,
    EmailFieldComponent,
    GeographyFieldComponent,
    HiddenFieldComponent,
    IntFieldComponent,
    LimitedStringFieldComponent,
    PasswordFieldComponent,
    SelectFieldComponent,
    StringFieldComponent,
    TimeFieldComponent,
    PackageDependenciesFieldComponent,
    AvailablePermissionsFieldComponent,
    FieldPermissionFieldComponent,
    PageHeaderComponent,
    SpeedDialFabComponent
  ],
  exports: [
    // Translation
    TranslateModule,
    // Material
    MaterialModule,
    // Components
    CalendarComponent,
    DropDownBlockComponent,
    SidebarMenuComponent,
    LanguageSelectComponent,
    OnlineStatusComponent,
    PackageDrawerComponent,
    PageHeaderComponent,
    PaginationComponent,
    ProgressComponent,
    NavBarComponent,
    QueueComponent,
    RecordsContainerComponent,
    RolesSelectComponent,
    // Crud
    ContainerComponent,
    CardBodyComponent,
    // Fields
    DynamicFormComponent,
    DynamicFormFieldComponent,
    CheckboxFieldComponent,
    DateFieldComponent,
    DateTimeFieldComponent,
    DecimalFieldComponent,
    DoubleFieldComponent,
    EmailFieldComponent,
    GeographyFieldComponent,
    HiddenFieldComponent,
    IntFieldComponent,
    LimitedStringFieldComponent,
    PasswordFieldComponent,
    RecurringExpressionFieldModule,
    ValidatorsFieldModule,
    SelectFieldComponent,
    StringFieldComponent,
    TimeFieldComponent,
    AvailablePermissionsFieldComponent,
    FieldPermissionFieldComponent,
    PackageDependenciesFieldComponent,
    SpeedDialFabComponent
  ]
})
export class PortalUiModule {
  constructor() {
    ReducerRegistry.Instance.register('ui', uiReducer);
    ReducerRegistry.Instance.register('standardSettings', standardSettingsReducer);
    ReducerRegistry.Instance.register('authentication', authenticationReducer);
  }
}
