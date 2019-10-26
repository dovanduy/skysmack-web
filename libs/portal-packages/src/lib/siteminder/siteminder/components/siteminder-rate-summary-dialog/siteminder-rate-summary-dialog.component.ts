import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { RateSummary } from '../../../models/rate-summary';
import { Channel, Rate, LodgingTypeRate } from '@skysmack/packages-siteminder';
import { LodgingType } from '@skysmack/packages-lodgings';
import { SiteMinderQueueService } from '../../../services/siteminder-queue.service';
import { deepFreeze, SubscriptionHandler, getLocalDate } from '@skysmack/framework';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-siteminder-rate-summary-dialog',
  templateUrl: './siteminder-rate-summary-dialog.component.html',
  styleUrls: ['./siteminder-rate-summary-dialog.component.scss']
})
export class SiteMinderRateSummaryDialogComponent implements OnInit, OnDestroy {
  public date: Date;
  public ratePlanTitle: string;
  public form: FormGroup;
  public formReady: boolean;
  public channels: Channel[];
  public lodgingType: LodgingType;
  private packagePath: string;
  private comparisonRates: Rate[] = [];
  private changeableRates: Rate[] = [];
  private subscriptionHandler = new SubscriptionHandler();

  constructor(
    private router: Router,
    private queueService: SiteMinderQueueService,
    public dialogRef: MatDialogRef<SiteMinderRateSummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RateSummary
  ) { }

  ngOnInit() {
    this.packagePath = this.router.url.split('/')[1];

    // Prepare data
    const { date, channels, rates, ratePlan, lodgingType } = this.data;
    this.date = date;
    this.channels = channels;
    this.ratePlanTitle = ratePlan ? ratePlan.object.name : '';
    this.lodgingType = lodgingType.object;

    // Process data
    this.form = new FormGroup({});
    channels.forEach(channel => {
      // Rates
      const rate = rates.find(rate => rate.object.channelId === channel.id);
      this.setRate(channel, rate ? rate.object : undefined, lodgingType.object.id)

      // Controls
      const formControl = new FormControl(rate ? rate.object.rate : null);
      this.form.addControl(channel.id.toString(), formControl);
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

  private setRate(channel: Channel, rate: LodgingTypeRate, lodgingTypeId): void {
    const dateOnlyString = getLocalDate(this.date);

    this.comparisonRates.push(deepFreeze(new Rate({
      start: dateOnlyString as any,
      end: dateOnlyString as any,
      lodgingTypeId,
      channels: [channel.id],
      rate: rate ? rate.rate : null
    })));

    this.changeableRates.push(new Rate({
      start: dateOnlyString as any,
      end: dateOnlyString as any,
      lodgingTypeId,
      channels: [channel.id],
      rate: rate ? rate.rate : null
    }));
  }
}
