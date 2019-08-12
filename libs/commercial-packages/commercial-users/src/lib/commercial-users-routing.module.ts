import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommercialUiPartnersWrapperComponent } from '@skysmack/commercial-ui-partners';
import { commercialUsersRoutes } from './components/commercial-users-components';

const routes = [
  {
    path: '', component: CommercialUiPartnersWrapperComponent, children: [
      ...commercialUsersRoutes
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommercialUsersRoutingModule { }
