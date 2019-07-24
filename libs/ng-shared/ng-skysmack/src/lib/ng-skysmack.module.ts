import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { NgSkysmackRequests } from './redux/ng-skysmack-requests';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [],
  providers: [{ provide: 'SkysmackRequests', useClass: NgSkysmackRequests }]
})
export class NgSkysmackModule {
  constructor() { }
}
