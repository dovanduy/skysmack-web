import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    MatGridListModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatBadgeModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatListModule
  ],
  providers: [
  ]
})
export class MaterialModule { }