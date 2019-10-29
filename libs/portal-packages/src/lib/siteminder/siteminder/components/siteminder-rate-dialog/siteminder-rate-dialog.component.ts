import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { RateInfo } from '../../../models/rate-info';
import { Channel, Rate, LodgingTypeRate } from '@skysmack/packages-siteminder';
import { LodgingType } from '@skysmack/packages-lodgings';
import { LocalObject, SubscriptionHandler, deepFreeze, getLocalDate } from '@skysmack/framework';
import { BehaviorSubject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { SiteMinderQueueService } from '../../../services/siteminder-queue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-siteminder-rate-dialog',
  templateUrl: './siteminder-rate-dialog.component.html',
  styleUrls: ['./siteminder-rate-dialog.component.scss']
})
export class SiteMinderRateDialogComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public formReady: boolean;
  public date: Date;
  public channel: LocalObject<Channel, number>;
  public ratePlanTitle: string;
  public lodgingType: LocalObject<LodgingType, number>;
  private packagePath: string;
  private comparisonRate: Rate;
  private changeableRate: Rate;
  private subscriptionHandler = new SubscriptionHandler();

  constructor(
    private router: Router,
    private queueService: SiteMinderQueueService,
    public dialogRef: MatDialogRef<SiteMinderRateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RateInfo
  ) { }

  ngOnInit() {
    this.packagePath = this.router.url.split('/')[1];
    const { date, channel, rate, ratePlan, lodgingType } = this.data;
    const channelId = channel.object.id.toString();
    this.date = date;
    this.channel = channel;
    this.ratePlanTitle = ratePlan.object.name;
    this.lodgingType = lodgingType;

    this.form = new FormGroup({});
    const formControl = rate ? new FormControl(rate.object.rate) : new FormControl(0)
    this.form.addControl(channelId, formControl);
    this.setRate(channel.object, rate ? rate.object : undefined, lodgingType.object.id, ratePlan.object.id)
    this.formReady = true;

    // Update rates on form change
    this.subscriptionHandler.register(this.form.valueChanges.pipe(
      tap((changes: { channelId: number }) => {
        this.changeableRate.rate = changes[channelId];
      })
    ).subscribe());
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public ok() {
    // Only update the rate if changed.
    if (this.changeableRate.rate !== this.comparisonRate.rate) {
      this.queueService.updateRates(this.packagePath, [this.changeableRate]);
    }

    this.dialogRef.close();
  }

  public cancel() {
    this.dialogRef.close();
  }

  private setRate(channel: Channel, rate: LodgingTypeRate, lodgingTypeId: number, ratePlanId: number): void {
    const dateOnlyString = getLocalDate(this.date);

    this.comparisonRate = deepFreeze(new Rate({
      start: dateOnlyString as any,
      end: dateOnlyString as any,
      lodgingTypeId,
      channels: [channel.id],
      rate: rate ? rate.rate : null
    }));

    this.changeableRate = new Rate({
      start: dateOnlyString as any,
      end: dateOnlyString as any,
      lodgingTypeId,
      ratePlanId,
      channels: [channel.id],
      rate: rate ? rate.rate : null
    });
  }
}