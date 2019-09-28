import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommercialTenantsRoutingModule } from './commercial-tenants-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { commercialTenantsComponents } from './components/commercial-tenants-components';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgDynamicFormsModule } from '@skysmack/ng-dynamic-forms';
import { NgTranslationModule, CommercialHttpLoaderFactory } from '@skysmack/ng-translation';
import { CommercialUiPartnersModule, NgMenuProviders } from '@skysmack/commercial-ui-partners';
import { NgCommercialTenantsMenuProvider } from './ng-commercial-tenants-menu-provider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { SubDomainFieldComponent } from './components/sub-domain-field/sub-domain-field.component';

const material = [
  MatCardModule,
  MatProgressBarModule,
  MatListModule,
  MatIconModule,
  MatProgressBarModule,
  MatTooltipModule
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgDynamicFormsModule,
    DynamicFormsModule,
    PortalFieldsModule,
    NgTranslationModule.forRoot(CommercialHttpLoaderFactory),
    CommercialUiPartnersModule,
    CommercialTenantsRoutingModule,
    ...material
  ],
  declarations: [
    ...commercialTenantsComponents,
    SubDomainFieldComponent
  ],
  exports: [    
    SubDomainFieldComponent
  ],
  providers: [],
  entryComponents: [
    SubDomainFieldComponent
  ]
})
export class CommercialTenantsModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ngCommercialUsersMenuProvider: NgCommercialTenantsMenuProvider
  ) {
    ngMenuProviders.add(ngCommercialUsersMenuProvider);
  }
}
