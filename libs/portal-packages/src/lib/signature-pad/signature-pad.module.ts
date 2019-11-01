import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgDynamicFormsModule } from '@skysmack/ng-dynamic-forms';
import { ReactiveFormsModule } from '@angular/forms';
import { signaturePadComponents, signaturePadEntryComponents } from './components/signature-pad-components';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

const material = [
  MatButtonModule,
  MatDialogModule
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    PortalFieldsModule,
    NgDynamicFormsModule,
    ...material
  ],
  exports: [
    ...signaturePadComponents
  ],
  declarations: [
    ...signaturePadComponents
  ],
  entryComponents: [
    ...signaturePadEntryComponents
  ],
  providers: []
})
export class SignaturePadModule {
  constructor(
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver
  ) {
    coalescingResolver.registerResolver(localResolver);
  }
}
