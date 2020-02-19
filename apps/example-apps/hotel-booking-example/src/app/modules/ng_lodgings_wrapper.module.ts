import { NgModule } from '@angular/core';
import { NgLodgingsModule } from './../../../../../../libs/ng-packages/ng-lodgings/src/lib/ng-lodgings.module';
import { RouterModule } from '@angular/router';
import { LodgingsComponent } from '../components/lodgings/lodgings.component';
import { SharedModule } from './shared.module';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  imports: [
    NgLodgingsModule,
    SharedModule,
    CommonModule,
    MatCardModule,
    MatRadioModule,
    RouterModule.forChild([{ path: '', component: LodgingsComponent }])
  ],
  declarations: [
    LodgingsComponent
  ],
})
export class NgLodgingsWrapperModule { }
