import { NgModule } from '@angular/core';
import { StepsComponent } from '../components/steps/steps.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [
    StepsComponent
  ],
  exports: [
    StepsComponent
  ]
})
export class SharedModule { }
