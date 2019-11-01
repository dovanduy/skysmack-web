import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgDynamicFormsModule } from '@skysmack/ng-dynamic-forms';
import { wysiwygComponents, wysiwygEntryComponents } from './components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularEditorModule,
    PortalFieldsModule,
    NgDynamicFormsModule
  ],
  exports: [
    ...wysiwygComponents
  ],
  declarations: [
    ...wysiwygComponents
  ],
  entryComponents: [
    ...wysiwygEntryComponents
  ],
  providers: []
})
export class WYSIWYGModule {
  constructor(
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver
  ) {
    coalescingResolver.registerResolver(localResolver);
  }
}
