import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormTestComponent } from './components/dynamic-form-test/dynamic-form-test.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DynamicFormTestComponent],
  exports: [DynamicFormTestComponent]
})
export class DynamicFormsModule { }
