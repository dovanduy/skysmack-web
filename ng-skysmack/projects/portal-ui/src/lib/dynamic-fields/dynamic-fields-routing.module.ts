import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { dynamicFieldsRoutes } from './components/dynamic-fields-components';

@NgModule({
  imports: [RouterModule.forChild(dynamicFieldsRoutes)],
  exports: [RouterModule]
})
export class DynamicFieldsRoutingModule { }
