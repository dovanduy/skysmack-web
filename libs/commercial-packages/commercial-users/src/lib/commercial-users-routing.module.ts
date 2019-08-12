import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommercialUiPartnersWrapperComponent } from '@skysmack/commercial-ui-partners';
import { CommercialUsersIndexComponent } from './components/commercial-users-index/commercial-users-index.component';
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
