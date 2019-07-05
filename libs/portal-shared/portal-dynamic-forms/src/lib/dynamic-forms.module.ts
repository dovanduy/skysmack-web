import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { NgDynamicFormsModule } from '@skysmack/ng-dynamic-forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgDynamicFormsModule
    // DynamicFormsRoutingModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
  providers: []
})
export class DynamicFormsModule {
  constructor() { }
}
