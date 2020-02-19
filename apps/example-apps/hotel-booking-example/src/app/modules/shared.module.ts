import { NgModule } from '@angular/core';
import { StepsComponent } from '../components/steps/steps.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

const material = [
  MatButtonModule
]

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    material
  ],
  declarations: [
    StepsComponent
  ],
  exports: [
    StepsComponent,
    ...material
  ]
})
export class SharedModule { }
