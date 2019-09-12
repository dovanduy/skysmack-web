import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from '@skysmack/portal-ui';
import { SwaggerUiComponent } from './swagger-ui/swagger-ui.component';
import { SettingsComponent } from '@skysmack/portal-settings';
import { RouteData } from '@skysmack/framework';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        { path: '', component: SwaggerUiComponent }
      ]
    },
    {
      path: 'settings/document', component: SettingsComponent, pathMatch: 'full', data: {
        fieldsConfigToken: 'NgOpenApiDocumentSettingsFieldsConfig'
      } as RouteData
    },
  ])],
  exports: [RouterModule]
})
export class OpenApiRoutingModule { }
