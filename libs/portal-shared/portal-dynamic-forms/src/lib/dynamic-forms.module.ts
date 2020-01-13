import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { NgDynamicFormsModule } from '@skysmack/ng-dynamic-forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PortalUiModule } from '@skysmack/portal-ui';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { FieldErrorsPipe } from './components/dynamic-form/field-errors.pipe';

const material = [
  MatExpansionModule,
  MatDividerModule,
  MatInputModule
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgDynamicFormsModule,
    PortalUiModule,
    ...material
    // DynamicFormsRoutingModule
  ],
  declarations: [
    ...components,
    FieldErrorsPipe
  ],
  exports: [
    ReactiveFormsModule,
    NgDynamicFormsModule,
    ...material,
    ...components
  ],
  providers: []
})
export class DynamicFormsModule {
  constructor() { }
}
