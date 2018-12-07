import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReducerRegistry } from '@skysmack/redux';
import { uiReducer } from './redux/ui-reducers';
import { settingsReducer } from './redux/settings';
import { RouterModule } from '@angular/router';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { RecurringExpressionFieldModule } from './components/fields/components/recurring-expression-field/recurring-expression-field.module';
import { CalendarComponent } from './components/common/calendar/calendar.component';
import { ContextSidebarComponent } from './components/common/context-sidebar/context-sidebar.component';
import { DataTableComponent } from './components/common/data-table/data-table.component';
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
import { DynamicFormComponent } from './components/fields/dynamic-form/dynamic-form.component';
import { DynamicFormFieldComponent } from './components/fields/dynamic-form-field/dynamic-form-field.component';
import { CheckboxFieldComponent } from './components/fields/components/checkbox-field/checkbox-field.component';
import { DateFieldComponent } from './components/fields/components/date-field/date-field.component';
import { DateTimeFieldComponent } from './components/fields/components/date-time-field/date-time-field.component';
import { DecimalFieldComponent } from './components/fields/components/decimal-field/decimal-field.component';
import { DoubleFieldComponent } from './components/fields/components/double-field/double-field.component';
import { EmailFieldComponent } from './components/fields/components/email-field/email-field.component';
import { GeographyFieldComponent } from './components/fields/components/geography-field/geography-field.component';
import { HiddenFieldComponent } from './components/fields/components/hidden-field/hidden-field.component';
import { IntFieldComponent } from './components/fields/components/int-field/int-field.component';
import { LimitedStringFieldComponent } from './components/fields/components/limited-string-field/limited-string-field.component';
import { PasswordFieldComponent } from './components/fields/components/password-field/password-field.component';
import { SelectFieldComponent } from './components/fields/components/select-field/select-field.component';
import { StringFieldComponent } from './components/fields/components/string-field/string-field.component';
import { TimeFieldComponent } from './components/fields/components/time-field/time-field.component';
import { PageHeaderComponent } from './components/common/page-header/page-header.component';
import { SpeedDialFabComponent } from './components/common/speed-dial-fab/speed-dial-fab.component';
import { ShowEntityActionDirective } from './directives';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IsAnonymousDirective, IsAuthenticatedDirective } from './autentication';
import { authenticationReducer } from '@skysmack/packages-authentication';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/');
}


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    RecurringExpressionFieldModule,
    MaterialModule // Must come after BrowserAnimationsModule
  ],
  declarations: [
    // Directives
    ShowEntityActionDirective,
    IsAuthenticatedDirective,
    IsAnonymousDirective,
    // Components
    CalendarComponent,
    ContextSidebarComponent,
    DataTableComponent,
    DropDownBlockComponent,
    SidebarMenuComponent,
    LanguageSelectComponent,
    OnlineStatusComponent,
    PackageDrawerComponent,
    PaginationComponent,
    ProgressComponent,
    NavBarComponent,
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
    PageHeaderComponent,
    SpeedDialFabComponent,
  ],
  exports: [
    // Material
    MaterialModule,
    // Components
    CalendarComponent,
    ContextSidebarComponent,
    DataTableComponent,
    DropDownBlockComponent,
    SidebarMenuComponent,
    LanguageSelectComponent,
    OnlineStatusComponent,
    PackageDrawerComponent,
    PageHeaderComponent,
    PaginationComponent,
    ProgressComponent,
    NavBarComponent,
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
    SelectFieldComponent,
    StringFieldComponent,
    TimeFieldComponent,
    SpeedDialFabComponent
  ]
})
export class PortalUiModule {
  constructor() {
    // TODO: Put better place?
    // EAGER LOADING!!!
    ReducerRegistry.Instance.register('ui', uiReducer);
    ReducerRegistry.Instance.register('settings', settingsReducer);
    ReducerRegistry.Instance.register('authentication', authenticationReducer);
  }
}
