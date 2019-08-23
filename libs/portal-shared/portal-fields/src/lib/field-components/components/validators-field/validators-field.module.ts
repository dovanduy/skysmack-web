import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@skysmack/ng-ui';
import { ValidatorsFieldComponent } from './validators-field.component';
import { RangeValidatorComponent } from './components/range-validator/range-validator.component';
import { RequiredValidatorComponent } from './components/required-validator/required-validator.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    TranslateModule
  ],
  declarations: [
    ValidatorsFieldComponent,
    RangeValidatorComponent,
    RequiredValidatorComponent
  ],
  exports: [ValidatorsFieldComponent]
})
export class ValidatorsFieldModule { }
