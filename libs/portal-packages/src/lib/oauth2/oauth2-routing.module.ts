import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DefaultComponent } from '@skysmack/portal-ui';


const routes: Routes = [
  {
    path: '', component: DefaultComponent, children: [
      {
        path: '', component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Oauth2RoutingModule { }
