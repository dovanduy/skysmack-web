import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormsRoutingModule } from './dynamic-forms-routing.module';
import { components } from './components';
import { NgDynamicFormsModule } from '@skysmack/ng-dynamic-forms';

@NgModule({
  imports: [
    CommonModule,
    NgDynamicFormsModule,
    DynamicFormsRoutingModule
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
