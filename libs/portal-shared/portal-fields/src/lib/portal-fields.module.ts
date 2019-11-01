import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';

import { dynamicFieldComponents } from './field-components/dynamic-field-components';
import { managementFieldsComponents } from './management-components/management-fields-components';
import { RecurringExpressionFieldComponent } from './field-components/components/recurring-expression-field/recurring-expression-field.component';
import { ValidatorsFieldComponent } from './field-components/components/validators-field/validators-field.component';
import { RecurringExpressionFieldModule } from './field-components/components/recurring-expression-field/recurring-expression-field.module';
import { ValidatorsFieldModule } from './field-components/components/validators-field/validators-field.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFieldsMenuProvider } from './ng-fields-menu-provider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';

const material = [
  MatCheckboxModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatSelectModule,
  MatListModule
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    RecurringExpressionFieldModule,
    ValidatorsFieldModule,
    ...material
  ],
  declarations: [
    ...dynamicFieldComponents,
    ...managementFieldsComponents
  ],
  exports: [
    ...material,
    ...dynamicFieldComponents,
    ...managementFieldsComponents,
    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  entryComponents: [
    ...dynamicFieldComponents,
    RecurringExpressionFieldComponent,
    ValidatorsFieldComponent
  ],
  providers: []
})
export class PortalFieldsModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ngFieldsMenuProvider: NgFieldsMenuProvider
  ) {
    ngMenuProviders
      .add(ngFieldsMenuProvider);
  }
}
