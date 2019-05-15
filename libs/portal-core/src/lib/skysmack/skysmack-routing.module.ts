import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkysmackIndexComponent } from './components/skysmack-index/skysmack-index.component';
import { RouteData } from '@skysmack/framework';
import { SettingsComponent } from '@skysmack/portal-ui';

const routes: Routes = [
  {
    path: 'skysmack', component: SkysmackIndexComponent, children: [
      {
        path: 'settings', component: SettingsComponent, pathMatch: 'full', data: {
          fieldsConfigToken: 'NgSkysmackSettingsFieldsConfig'
        } as RouteData
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkysmackRoutingModule { }
