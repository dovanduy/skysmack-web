import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { fieldsRoutes } from './components/fields-components';

@NgModule({
  imports: [RouterModule.forChild(fieldsRoutes)],
  exports: [RouterModule]
})
export class FieldsRoutingModule { }
