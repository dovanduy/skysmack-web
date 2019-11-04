import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { RateSummary } from '../../../models/rate-summary';
import { Channel, Rate, LodgingTypeRate } from '@skysmack/packages-siteminder';
import { LodgingType } from '@skysmack/packages-lodgings';
import { SiteMinderQueueService } from '../../../services/siteminder-queue.service';
import { deepFreeze, SubscriptionHandler, getLocalDate } from '@skysmack/framework';
import { tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LodgingCell } from '../../../models/lodging-cell';
import { RateplanCell } from '../../../models/rateplan-cell';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'ss-siteminder-rate-summary-dialog',
  templateUrl: './siteminder-rate-summary-dialog.component.html',
  styleUrls: ['./siteminder-rate-summary-dialog.component.scss']
})
export class SiteMinderRateSummaryDialogComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public formReady: boolean;
  
  public date: string;
  public lodgingTypeCell: LodgingCell;
  public rateplanCell: RateplanCell

  private packagePath: string;
  private comparisonRates: Rate[] = [];
  private changeableRates: Rate[] = [];

  private subscriptionHandler = new SubscriptionHandler();

  constructor(
    private router: Router,
    private queueService: SiteMinderQueueService,
    public dialogRef: MatDialogRef<SiteMinderRateSummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { date: Date, lodgingTypeCell: LodgingCell, rateplanCell: RateplanCell }
  ) { }

  ngOnInit() {
    this.packagePath = this.router.url.split('/')[1];

    this.date = moment(this.data.date).format('YYYY-MM-DD');
    this.lodgingTypeCell = this.data.lodgingTypeCell;
    this.rateplanCell = this.data.rateplanCell;

    // Process data
    this.form = new FormGroup({});
    this.rateplanCell.channelCells.forEach(channel => {
      // Rates
      this.setRate(channel.channelId, channel.rateInfo ? channel.rateInfo.object : undefined, this.lodgingTypeCell.lodgingType.object.id, this.rateplanCell.rateplanId)

      // Controls
      const formControl = new FormControl(channel.rateInfo ? channel.rateInfo.object.rate : null);
      this.form.addControl(channel.channelId.toString(), formControl);
    });
    this.formReady = true;


    // Update rates on form change
    this.subscriptionHandler.register(this.form.valueChanges.pipe(
      tap((changes: { [channelId: string]: number }) => {
        Object.keys(changes).forEach(key => {
          const rate = changes[key];
          const foundRate = this.changeableRates.find(rate => rate.channels.includes(Number(key)));
          foundRate.rate = rate;
        });
      })
    ).subscribe());
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public ok(): void {
    // Only include rates with changed rates.
    const ratesToUpdate = this.changeableRates.filter((rate, index) => {
      return this.comparisonRates[index].rate !== rate.rate;
    });

    this.queueService.updateRates(this.packagePath, ratesToUpdate);

    this.dialogRef.close();
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  private setRate(channelId: number, rate: LodgingTypeRate, lodgingTypeId: number, ratePlanId: number): void {
    const dateOnlyString = this.date;

    this.comparisonRates.push(deepFreeze(new Rate({
      start: dateOnlyString as any,
      end: dateOnlyString as any,
      lodgingTypeId,
      channels: [channelId],
      rate: rate ? rate.rate : null
    })));

    this.changeableRates.push(new Rate({
      start: dateOnlyString as any,
      end: dateOnlyString as any,
      lodgingTypeId,
      ratePlanId,
      channels: [channelId],
      rate: rate ? rate.rate : null
    }));
  }
}
