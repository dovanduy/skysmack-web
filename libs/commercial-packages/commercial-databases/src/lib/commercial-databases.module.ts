import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommercialDatabasesRoutingModule } from './commercial-databases-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { commercialDatabasesComponents } from './components/commercial-databases-components';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgDynamicFormsModule } from '@skysmack/ng-dynamic-forms';
import { NgTranslationModule } from '@skysmack/ng-translation';
import { CommercialUiPartnersModule, NgMenuProviders } from '@skysmack/commercial-ui-partners';
import { NgCommercialDatabasesMenuProvider } from './ng-commercial-databases-menu-provider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

const material = [
  MatCardModule,
  MatListModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatIconModule
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgDynamicFormsModule,
    DynamicFormsModule,
    PortalFieldsModule,
    NgTranslationModule,
    CommercialUiPartnersModule,
    CommercialDatabasesRoutingModule,
    ...material
  ],
  declarations: [
    ...commercialDatabasesComponents
  ],
  providers: []
})
export class CommercialDatabasesModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ngCommercialUsersMenuProvider: NgCommercialDatabasesMenuProvider
  ) {
    ngMenuProviders.add(ngCommercialUsersMenuProvider);
  }
}
