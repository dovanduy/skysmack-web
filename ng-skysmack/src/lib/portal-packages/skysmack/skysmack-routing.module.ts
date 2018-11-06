import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkysmackIndexComponent } from './components/skysmack-index/skysmack-index.component';

const routes: Routes = [
  {
    path: '', component: SkysmackIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkysmackRoutingModule { }
