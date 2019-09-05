import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommercialUsersRoutingModule } from './commercial-users-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { commercialUsersComponents } from './components/commercial-users-components';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgDynamicFormsModule } from '@skysmack/ng-dynamic-forms';
import { NgTranslationModule, CommercialHttpLoaderFactory } from '@skysmack/ng-translation';
import { CommercialUiPartnersModule, NgMenuProviders } from '@skysmack/commercial-ui-partners';
import { NgCommercialUsersMenuProvider } from './ng-commercial-users-menu-provider';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    CommercialUsersRoutingModule,
    ...material
  ],
  declarations: [
    ...commercialUsersComponents
  ],
  providers: []
})
export class CommercialUsersModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ngCommercialUsersMenuProvider: NgCommercialUsersMenuProvider
  ) {
    ngMenuProviders.add(ngCommercialUsersMenuProvider);
  }
}
