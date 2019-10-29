import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { LodgingTypeAvailability, LodgingTypeAvailabilityKey, Availability } from '@skysmack/packages-siteminder';
import { LodgingType } from '@skysmack/packages-lodgings';
import { LocalObject, SubscriptionHandler } from '@skysmack/framework';
import { Router } from '@angular/router';
import { SiteMinderQueueService } from '../../../services/siteminder-queue.service';

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
  private packagePath: string;
  private date: Date;
  private originalAvailableModfier: number;
  private newAvailableModifier: number;
  private subscriptionHandler = new SubscriptionHandler();

  constructor(
    private router: Router,
    private queueService: SiteMinderQueueService,
    public dialogRef: MatDialogRef<SiteMinderAvailabilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LocalObject<LodgingTypeAvailability, LodgingTypeAvailabilityKey>
  ) { }

  ngOnInit() {
    this.packagePath = this.router.url.split('/')[1];
    this.available = this.data.object.available;
    this.lodgingType = this.data.object.lodgingType.object;
    const availableModifier = this.data.object.availableModifier
    this.originalAvailableModfier = availableModifier;
    this.date = this.data.object.date;

    this.form = new FormGroup({});
    const formControl = new FormControl(availableModifier);
    this.form.addControl('availableModifier', formControl);

    this.availableAfterModification$ = this.form.valueChanges.pipe(
      startWith({ availableModifier: availableModifier }),
      map(changes => {
        this.newAvailableModifier = changes.availableModifier;
        return this.available + changes.availableModifier;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public ok() {
    if (this.originalAvailableModfier !== this.newAvailableModifier) {
      this.queueService.updateAvailability(this.packagePath, new Availability({
        start: this.date,
        end: this.date,
        lodgingTypeId: this.lodgingType.id,
        availableModifier: this.newAvailableModifier
      }));
    }

    this.dialogRef.close();
  }

  public cancel() {
    this.dialogRef.close();
  }
}
