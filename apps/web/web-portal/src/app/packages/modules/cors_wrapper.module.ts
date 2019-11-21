import { NgModule } from '@angular/core';
import { CorsModule } from './../../../../../../../libs/portal-packages/src/lib/cors/cors.module';


@NgModule({
  imports: [
    CorsModule
  ]
})
export class CorsWrapperModule { }
