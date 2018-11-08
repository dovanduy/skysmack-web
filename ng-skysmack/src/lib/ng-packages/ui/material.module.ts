import { NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  MatGridListModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatBadgeModule,
  MatDividerModule
} from '@angular/material';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSidenavModule,
    CdkAccordionModule,
    MatTooltipModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatDividerModule,
    MatSnackBarModule,
    MatBadgeModule

  ],
  exports: [
    MatGridListModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSidenavModule,
    CdkAccordionModule,
    MatTooltipModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatDividerModule,
    MatSnackBarModule,
    MatBadgeModule
  ],
  providers: [
  ]
})
export class MaterialModule { }