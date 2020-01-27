import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ValidatorsFieldComponent } from './validators-field.component';
import { RangeValidatorComponent } from './components/range-validator/range-validator.component';
import { RequiredValidatorComponent } from './components/required-validator/required-validator.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

const material = [
  MatSelectModule,
  MatCheckboxModule,
  MatButtonModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ...material
  ],
  declarations: [
    ValidatorsFieldComponent,
    RangeValidatorComponent,
    RequiredValidatorComponent
  ],
  exports: [ValidatorsFieldComponent]
})
export class ValidatorsFieldModule { }
