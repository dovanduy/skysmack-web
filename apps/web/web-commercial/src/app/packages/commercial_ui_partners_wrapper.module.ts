import { NgModule } from '@angular/core';
import { CommercialUiPartnersModule } from './../../../../../../libs/commercial-packages/commercial-ui-partners/src/lib/commercial-ui-partners.module';
import { Route } from '@angular/router';

@NgModule({
  imports: [
    CommercialUiPartnersModule
  ]
})
export class CommercialUiPartnersWrapperModule { }

export const commercialUiPartnersRoute = { path: 'ui-partners', loadChildren: './packages/commercial_ui_partners_wrapper.module#CommercialUiPartnersWrapperModule' } as Route;