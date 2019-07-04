import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { directives } from './directives/directives';
import { components } from './components/components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...components,
    ...directives,
  ],
  exports: [
    ...components,
    ...directives
  ]
})
export class NgDynamicFormsModule { }
