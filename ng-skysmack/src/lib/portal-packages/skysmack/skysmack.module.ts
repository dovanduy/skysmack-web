import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { SkysmackIndexComponent } from './components';
import { SkysmackRoutingModule } from './skysmack-routing.module';
import { NgSkysmackModule } from 'lib/ng-packages';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SkysmackRoutingModule,
    NgSkysmackModule
  ],
  exports: [],
  declarations: [SkysmackIndexComponent],
  providers: [],
})
export class SkysmackModule { }
