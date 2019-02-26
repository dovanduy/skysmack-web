import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../../../../material.module';
import { ValidatorsFieldComponent } from './validators-field.component';
import { RangeValidatorComponent } from './components/range-validator/range-validator.component';
import { RequiredValidatorComponent } from './components/required-validator/required-validator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    ValidatorsFieldComponent,
    RangeValidatorComponent,
    RequiredValidatorComponent
  ],
  exports: [ValidatorsFieldComponent]
})
export class ValidatorsFieldModule { }
