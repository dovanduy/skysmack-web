import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../../../../material.module';
import { ValidatorsFieldComponent } from './validators-field.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    ValidatorsFieldComponent
  ],
  exports: [ValidatorsFieldComponent]
})
export class ValidatorsFieldModule { }
