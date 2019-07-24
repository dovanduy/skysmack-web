import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from '@skysmack/portal-ui';
import { SwaggerUiComponent } from './swagger-ui/swagger-ui.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
          { path: '', component: SwaggerUiComponent }
      ]
    }
  ])],
  exports: [RouterModule]
})
export class OpenApiRoutingModule { }
