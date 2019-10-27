import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { Channel, LodgingTypeRate } from '@skysmack/packages-siteminder';
import { SiteMinderQueueService } from '../../../services/siteminder-queue.service';
import { SubscriptionHandler, getLocalDate } from '@skysmack/framework';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ss-siteminder-restrictions-summary-dialog',
  templateUrl: './siteminder-restrictions-summary-dialog.component.html',
  styleUrls: ['./siteminder-restrictions-summary-dialog.component.scss']
})
export class SiteMinderRestrictionsSummaryDialogComponent implements OnInit, OnDestroy {
  public date: Date;
  public form: FormGroup;
  public formReady: boolean;
  private packagePath: string;
  // private comparisonRates: Rate[] = [];
  // private changeableRates: Rate[] = [];
  private subscriptionHandler = new SubscriptionHandler();

  constructor(
    private router: Router,
    private queueService: SiteMinderQueueService,
    public dialogRef: MatDialogRef<SiteMinderRestrictionsSummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BehaviorSubject<any>
  ) { }

  ngOnInit() {
    this.packagePath = this.router.url.split('/')[1];

    // this.subscriptionHandler.register(this.data.pipe(
    //   switchMap(data => {
    //     // Prepare data
    //     const { date, channels, rates, ratePlan, lodgingType } = data;
    //     this.date = date;
    //     this.channels = channels;
    //     this.ratePlanTitle = ratePlan ? ratePlan.object.name : '';
    //     this.lodgingType = lodgingType.object;

    //     // Process data
    //     this.form = new FormGroup({});
    //     channels.forEach(channel => {
    //       // Rates
    //       const rate = rates.find(rate => rate.object.channelId === channel.id);
    //       this.setRate(channel, rate ? rate.object : undefined, lodgingType.object.id, ratePlan.object.id)

    //       // Controls
    //       const formControl = new FormControl(rate ? rate.object.rate : null);
    //       this.form.addControl(channel.id.toString(), formControl);
    //     });
    //     this.formReady = true;


    //     // Update rates on form change
    //     return this.form.valueChanges.pipe(
    //       tap((changes: { [channelId: string]: number }) => {
    //         Object.keys(changes).forEach(key => {
    //           const rate = changes[key];
    //           const foundRate = this.changeableRates.find(rate => rate.channels.includes(Number(key)));
    //           foundRate.rate = rate;
    //         });
    //       })
    //     );
    //   })
    // ).subscribe());
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public ok(): void {
    // Only include rates with changed rates.
    // const ratesToUpdate = this.changeableRates.filter((rate, index) => {
    //   return this.comparisonRates[index].rate !== rate.rate;
    // });
    // this.queueService.updateRates(this.packagePath, ratesToUpdate);

    this.dialogRef.close();
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  private setRate(channel: Channel, rate: LodgingTypeRate, lodgingTypeId: number, ratePlanId: number): void {
    const dateOnlyString = getLocalDate(this.date);

    // this.comparisonRates.push(deepFreeze(new Rate({
    //   start: dateOnlyString as any,
    //   end: dateOnlyString as any,
    //   lodgingTypeId,
    //   channels: [channel.id],
    //   rate: rate ? rate.rate : null
    // })));

    // this.changeableRates.push(new Rate({
    //   start: dateOnlyString as any,
    //   end: dateOnlyString as any,
    //   lodgingTypeId,
    //   ratePlanId,
    //   channels: [channel.id],
    //   rate: rate ? rate.rate : null
    // }));
  }
}
