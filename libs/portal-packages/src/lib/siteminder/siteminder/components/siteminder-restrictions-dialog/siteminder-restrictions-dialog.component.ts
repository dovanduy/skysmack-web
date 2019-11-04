import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Channel, LodgingTypeRate, Rate, AvailabilityRestriction } from '@skysmack/packages-siteminder';
import { getLocalDate, SubscriptionHandler, deepFreeze } from '@skysmack/framework';
import { SiteMinderQueueService } from '../../../services/siteminder-queue.service';
import { Router } from '@angular/router';
import { LodgingCell } from '../../../models/lodging-cell';
import { RateplanCell } from '../../../models/rateplan-cell';
import { ChannelCell } from '../../../models/channel-cell';
import * as _moment from 'moment';
import { tap } from 'rxjs/operators';
const moment = _moment;

@Component({
  selector: 'ss-siteminder-restrictions-dialog',
  templateUrl: './siteminder-restrictions-dialog.component.html',
  styleUrls: ['./siteminder-restrictions-dialog.component.scss']
})
export class SiteMinderRestrictionsDialogComponent implements OnInit, OnDestroy {
  private packagePath: string;

  public form: FormGroup;
  public formReady: boolean;

  public date: string;
  public lodgingTypeCell: LodgingCell;
  public rateplanCell: RateplanCell
  public channelCell: ChannelCell;

  private comparisonRate: Rate;
  private changeableRate: Rate;

  private subscriptionHandler = new SubscriptionHandler();

  constructor(
    private router: Router,
    private queueService: SiteMinderQueueService,
    public dialogRef: MatDialogRef<SiteMinderRestrictionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { date: Date, lodgingTypeCell: LodgingCell, rateplanCell: RateplanCell, channelCell: ChannelCell }
  ) { }

  ngOnInit() {
    this.packagePath = this.router.url.split('/')[1];

    this.date = moment(this.data.date).format('YYYY-MM-DD');
    this.lodgingTypeCell = this.data.lodgingTypeCell;
    this.rateplanCell = this.data.rateplanCell;
    this.channelCell = this.data.channelCell;

    this.form = new FormGroup({});

    // AvailabilityRestriction
    const availabilityRestrictionControl = this.channelCell.rateInfo ? new FormControl(this.channelCell.rateInfo.object.restriction) : new FormControl(0);
    // minimumLengthOfStay
    const minimumLengthOfStayControl = this.channelCell.rateInfo ? new FormControl(this.channelCell.rateInfo.object.minimumLengthOfStay) : new FormControl(0);
    // maximumLengthOfStay
    const maximumLengthOfStayControl = this.channelCell.rateInfo ? new FormControl(this.channelCell.rateInfo.object.maximumLengthOfStay) : new FormControl(0);


    this.form.addControl('restriction', availabilityRestrictionControl);
    this.form.addControl('minimumLengthOfStay', minimumLengthOfStayControl);
    this.form.addControl('maximumLengthOfStayControl', maximumLengthOfStayControl);

    this.setRate(this.channelCell.channelId, this.channelCell.rateInfo ? this.channelCell.rateInfo.object.rate : undefined, this.lodgingTypeCell.lodgingType.object.id, this.rateplanCell.rateplanId)
    this.formReady = true;

    // Update rates on form change
    this.subscriptionHandler.register(this.form.valueChanges.pipe(
      tap((changes: { restriction: AvailabilityRestriction, minimumLengthOfStay: number, maximumLengthOfStay: number }) => {
        console.log(changes);
        // this.changeableRate.rate = changes[this.channelCell.channelId];
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

  private setRate(channelId: number, rate: number, lodgingTypeId: number, ratePlanId: number): void {

    this.comparisonRate = deepFreeze(new Rate({
      start: this.date as any,
      end: this.date as any,
      lodgingTypeId,
      channels: [channelId],
      rate: rate ? rate : null
    }));

    this.changeableRate = new Rate({
      start: this.date as any,
      end: this.date as any,
      lodgingTypeId,
      ratePlanId,
      channels: [channelId],
      rate: rate ? rate : null
    });
  }
}