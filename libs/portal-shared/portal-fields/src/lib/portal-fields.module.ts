import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { PortalUiModule, MaterialModule } from '@skysmack/portal-ui';
import { LanguageService } from '@skysmack/portal-ui';
import { dynamicFieldComponents } from './field-components/dynamic-field-components';
import { managementFieldsComponents } from './management-components/management-fields-components';
import { RecurringExpressionFieldComponent } from './field-components/components/recurring-expression-field/recurring-expression-field.component';
import { ValidatorsFieldComponent } from './field-components/components/validators-field/validators-field.component';
import { RecurringExpressionFieldModule } from './field-components/components/recurring-expression-field/recurring-expression-field.module';
import { ValidatorsFieldModule } from './field-components/components/validators-field/validators-field.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    PortalUiModule,
    DynamicFormsModule,
    RecurringExpressionFieldModule,
    ValidatorsFieldModule,
    AngularEditorModule
  ],
  declarations: [
    ...dynamicFieldComponents,
    ...managementFieldsComponents
  ],
  exports: [
    ...dynamicFieldComponents,
    ...managementFieldsComponents
  ],
  entryComponents: [
    ...dynamicFieldComponents,
    RecurringExpressionFieldComponent,
    ValidatorsFieldComponent
  ],
  providers: [
    LanguageService
  ]
})
export class PortalFieldsModule {
  constructor() { }
}
