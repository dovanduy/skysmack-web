import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LodgingTypeAvailability } from '@skysmack/packages-siteminder';
import { LodgingType } from '@skysmack/packages-lodgings';

@Component({
  selector: 'ss-siteminder-availability-dialog',
  templateUrl: './siteminder-availability-dialog.component.html',
  styleUrls: ['./siteminder-availability-dialog.component.scss']
})
export class SiteMinderAvailabilityDialogComponent implements OnInit {

  public availableModifierControl = new FormControl();
  public available: number;
  public lodgingType: LodgingType;
  public availableAfterModification$: Observable<number>;

  constructor(
    public dialogRef: MatDialogRef<SiteMinderAvailabilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LodgingTypeAvailability
  ) { }

  ngOnInit() {
    this.available = this.data.available;
    this.lodgingType = this.data.lodgingType.object;
    const availableModifier = this.data.availableModifier

    this.availableModifierControl.setValue(availableModifier);

    this.availableAfterModification$ = this.availableModifierControl.valueChanges.pipe(
      startWith(availableModifier),
      map(availableModifier => this.available + availableModifier)
    );
  }

  public ok() {
    this.dialogRef.close();
  }

  public cancel() {
    this.dialogRef.close();
  }
}
