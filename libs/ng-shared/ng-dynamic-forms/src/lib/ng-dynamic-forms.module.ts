import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { directives } from './directives/directives';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...directives,
  ],
  exports: [
    ...directives
  ]
})
export class NgDynamicFormsModule { }
