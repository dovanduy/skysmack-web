import { NgModule } from '@angular/core';
import { NgLodgingsModule } from './../../../../../../libs/ng-packages/ng-lodgings/src/lib/ng-lodgings.module';
import { RouterModule } from '@angular/router';
import { LodgingsComponent } from '../components/lodgings/lodgings.component';
import { SharedModule } from './shared.module';

@NgModule({
  imports: [
    NgLodgingsModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: LodgingsComponent }])
  ],
  declarations: [
    LodgingsComponent
  ],
})
export class NgLodgingsWrapperModule { }
