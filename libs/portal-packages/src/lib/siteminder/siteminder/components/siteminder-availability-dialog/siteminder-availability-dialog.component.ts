import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Availability } from 'libs/packages/siteminder/src';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'ss-siteminder-availability-dialog',
  templateUrl: './siteminder-availability-dialog.component.html',
  styleUrls: ['./siteminder-availability-dialog.component.scss']
})
export class SiteMinderAvailabilityDialogComponent implements OnInit {

  public availableControl = new FormControl();
  public availableModifierControl = new FormControl();
  public availableAfterModification$: Observable<number>;

  constructor(
    public dialogRef: MatDialogRef<SiteMinderAvailabilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Availability
  ) { }

  ngOnInit() {
    const available = this.data.available;
    const availableModifier = this.data.availableModifier

    this.availableControl.setValue(available);
    this.availableModifierControl.setValue(availableModifier);

    this.availableAfterModification$ = combineLatest([
      this.availableControl.valueChanges.pipe(startWith(available)),
      this.availableModifierControl.valueChanges.pipe(startWith(availableModifier))
    ]).pipe(
      map(([available, availableModifier]) => available + availableModifier)
    );
  }

  public ok() {
    // Update availability
    console.log('Updating availability')
    this.dialogRef.close();
  }

  public cancel() {
    this.dialogRef.close();
  }
}
