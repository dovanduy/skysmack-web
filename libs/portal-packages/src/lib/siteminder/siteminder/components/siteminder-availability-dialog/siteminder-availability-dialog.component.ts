import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { LodgingTypeAvailability, LodgingTypeAvailabilityKey } from '@skysmack/packages-siteminder';
import { LodgingType } from '@skysmack/packages-lodgings';
import { LocalObject, SubscriptionHandler } from '@skysmack/framework';

@Component({
  selector: 'ss-siteminder-availability-dialog',
  templateUrl: './siteminder-availability-dialog.component.html',
  styleUrls: ['./siteminder-availability-dialog.component.scss']
})
export class SiteMinderAvailabilityDialogComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public available: number;
  public lodgingType: LodgingType;
  public availableAfterModification$: Observable<number>;
  private subscriptionHandler = new SubscriptionHandler();

  constructor(
    public dialogRef: MatDialogRef<SiteMinderAvailabilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BehaviorSubject<LocalObject<LodgingTypeAvailability, LodgingTypeAvailabilityKey>>
  ) { }

  ngOnInit() {
    this.subscriptionHandler.register(this.data.pipe(
      tap(data => {
        this.available = data.object.available;
        this.lodgingType = data.object.lodgingType.object;
        const availableModifier = data.object.availableModifier

        this.form = new FormGroup({});
        const formControl = new FormControl(availableModifier);
        this.form.addControl('availableModifier', formControl);

        this.availableAfterModification$ = this.form.valueChanges.pipe(
          startWith({ availableModifier: availableModifier }),
          map(changes => this.available + changes.availableModifier)
        );
      })
    ).subscribe());
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public ok() {
    this.dialogRef.close();
  }

  public cancel() {
    this.dialogRef.close();
  }
}
