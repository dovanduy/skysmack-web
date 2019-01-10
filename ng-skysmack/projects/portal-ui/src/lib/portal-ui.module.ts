import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReducerRegistry, authenticationReducer } from '@skysmack/redux';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { RecurringExpressionFieldModule } from './components/fields/components/recurring-expression-field/recurring-expression-field.module';
import { CalendarComponent } from './components/common/calendar/calendar.component';
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

import { MaterialModule } from './material.module';
import { uiReducer } from './redux/ui-reducers';
import { settingsReducer } from './redux/settings';

import { PackageDependenciesFieldComponent } from './components/fields/components/package-dependencies-field/package-dependencies-field.component';
import { HttpLoaderFactory } from './portal-ui.helper';
import { ShowEntityActionDirective } from './directives/show-entity-action.directive';
import { IsAuthenticatedDirective } from './autentication/is-authenticated.directive';
import { IsAnonymousDirective } from './autentication/is-anonymous.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
    CalendarModule,
    RecurringExpressionFieldModule,
    MaterialModule // Must come after BrowserAnimationsModule
  ],
  providers: [
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    },
    {
      provide: DateAdapter,
      useFactory: adapterFactory
    }
  ],
  declarations: [
    // Directives
    ShowEntityActionDirective,
    IsAuthenticatedDirective,
    IsAnonymousDirective,
    // Components
    CalendarComponent,
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
    PackageDependenciesFieldComponent,
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
    PackageDependenciesFieldComponent,
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
