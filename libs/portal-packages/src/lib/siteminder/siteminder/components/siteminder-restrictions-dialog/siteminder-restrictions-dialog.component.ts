import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { Channel, LodgingTypeRate } from '@skysmack/packages-siteminder';
import { SubscriptionHandler, getLocalDate } from '@skysmack/framework';
import { BehaviorSubject } from 'rxjs';
import { SiteMinderQueueService } from '../../../services/siteminder-queue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-siteminder-restrictions-dialog',
  templateUrl: './siteminder-restrictions-dialog.component.html',
  styleUrls: ['./siteminder-restrictions-dialog.component.scss']
})
export class SiteMinderRestrictionsDialogComponent implements OnInit, OnDestroy {

  // private comparisonRate: Rate;
  // private changeableRate: Rate;
  public form: FormGroup;
  public formReady: boolean;
  public date: Date;
  private packagePath: string;
  private subscriptionHandler = new SubscriptionHandler();

  constructor(
    private router: Router,
    private queueService: SiteMinderQueueService,
    public dialogRef: MatDialogRef<SiteMinderRestrictionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BehaviorSubject<any>
  ) { }

  ngOnInit() {
    this.packagePath = this.router.url.split('/')[1];

    // this.subscriptionHandler.register(this.data.pipe(
    //   switchMap(data => {
    //     const { date, channel, rate, ratePlan, lodgingType } = data;
    //     const channelId = channel.object.id.toString();
    //     this.date = date;
    //     this.channel = channel;
    //     this.ratePlanTitle = ratePlan.object.name;
    //     this.lodgingType = lodgingType;

    //     this.form = new FormGroup({});
    //     const formControl = rate ? new FormControl(rate.object.rate) : new FormControl(0)
    //     this.form.addControl(channelId, formControl);
    //     this.setRate(channel.object, rate ? rate.object : undefined, lodgingType.object.id, ratePlan.object.id)
    //     this.formReady = true;

    //     // Update rates on form change
    //     return this.form.valueChanges.pipe(
    //       tap((changes: { channelId: number }) => {
    //         this.changeableRate.rate = changes[channelId];
    //       })
    //     );
    //   })
    // ).subscribe());
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public ok() {
    // Only update the rate if changed.
    this.dialogRef.close();
  }

  public cancel() {
    this.dialogRef.close();
  }

  private setRate(channel: Channel, rate: LodgingTypeRate, lodgingTypeId: number, ratePlanId: number): void {
    const dateOnlyString = getLocalDate(this.date);

    //   this.comparisonRate = deepFreeze(new Rate({
    //     start: dateOnlyString as any,
    //     end: dateOnlyString as any,
    //     lodgingTypeId,
    //     channels: [channel.id],
    //     rate: rate ? rate.rate : null
    //   }));

    //   this.changeableRate = new Rate({
    //     start: dateOnlyString as any,
    //     end: dateOnlyString as any,
    //     lodgingTypeId,
    //     ratePlanId,
    //     channels: [channel.id],
    //     rate: rate ? rate.rate : null
    //   });
    // }
  }
}