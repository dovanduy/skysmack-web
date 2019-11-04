import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Rate } from '@skysmack/packages-siteminder';
import { SubscriptionHandler, deepFreeze } from '@skysmack/framework';
import { tap } from 'rxjs/operators';
import { SiteMinderQueueService } from '../../../services/siteminder-queue.service';
import { Router } from '@angular/router';
import { LodgingCell } from '../../../models/lodging-cell';
import { RateplanCell } from '../../../models/rateplan-cell';
import { ChannelCell } from '../../../models/channel-cell';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'ss-siteminder-rate-dialog',
  templateUrl: './siteminder-rate-dialog.component.html',
  styleUrls: ['./siteminder-rate-dialog.component.scss']
})
export class SiteMinderRateDialogComponent implements OnInit, OnDestroy {

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
    public dialogRef: MatDialogRef<SiteMinderRateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { date: Date, lodgingTypeCell: LodgingCell, rateplanCell: RateplanCell, channelCell: ChannelCell }
  ) { }

  ngOnInit() {
    this.packagePath = this.router.url.split('/')[1];
    
    this.date = moment(this.data.date).format('YYYY-MM-DD');
    this.lodgingTypeCell = this.data.lodgingTypeCell;
    this.rateplanCell = this.data.rateplanCell;
    this.channelCell = this.data.channelCell;

    this.form = new FormGroup({});
    const formControl = this.channelCell.rateInfo ? new FormControl(this.channelCell.rateInfo.object.rate) : new FormControl(0)
    this.form.addControl(this.channelCell.channelId.toString(), formControl);
    this.setRate(this.channelCell.channelId, this.channelCell.rateInfo ? this.channelCell.rateInfo.object.rate : undefined, this.lodgingTypeCell.lodgingType.object.id, this.rateplanCell.rateplanId)
    this.formReady = true;

    // Update rates on form change
    this.subscriptionHandler.register(this.form.valueChanges.pipe(
      tap((changes: { channelId: number }) => {
        this.changeableRate.rate = changes[this.channelCell.channelId];
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