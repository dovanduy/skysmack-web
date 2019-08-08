import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginWrapperComponent } from './components';


const routes: Routes = [
  {
    path: '', component: LoginWrapperComponent, children: [
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
export class OAuth2RoutingModule { }
