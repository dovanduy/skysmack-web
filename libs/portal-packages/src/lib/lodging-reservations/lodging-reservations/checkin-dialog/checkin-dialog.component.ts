import { Component, OnInit, Inject } from '@angular/core';
import { LocalObject } from '@skysmack/framework';
import { DetailedLodgingType } from '@skysmack/packages-lodgings';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { NgLodgingReservationsActions } from '@skysmack/ng-lodging-reservations';
import { LodgingReservation, CheckIn } from '@skysmack/packages-lodging-reservations';

@Component({
  selector: 'ss-checkin-dialog',
  templateUrl: './checkin-dialog.component.html'
})
export class CheckinDialogComponent implements OnInit {
  public autoCompleteControl = new FormControl();
  public detailedLodgingTypes$: Observable<DetailedLodgingType[]>;
  private selectedLodgingType: DetailedLodgingType;

  constructor(
    public actions: NgLodgingReservationsActions,
    private dialogRef: MatDialogRef<CheckinDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { packagePath: string, reservation: LocalObject<LodgingReservation, number> }
  ) { }

  ngOnInit() {
  }

  public checkIn(): void {
    this.actions.checkIn(this.data.packagePath, this.data.reservation, [ new CheckIn({ reservationId: this.data.reservation.object.id }) ]);
    this.dialogRef.close(this.selectedLodgingType);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
