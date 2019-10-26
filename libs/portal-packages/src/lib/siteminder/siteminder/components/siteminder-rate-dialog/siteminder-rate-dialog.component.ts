import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { RateInfo } from '../../../models/rate-info';
import { Channel } from '@skysmack/packages-siteminder';
import { LodgingType } from '@skysmack/packages-lodgings';
import { LocalObject, SubscriptionHandler } from '@skysmack/framework';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ss-siteminder-rate-dialog',
  templateUrl: './siteminder-rate-dialog.component.html',
  styleUrls: ['./siteminder-rate-dialog.component.scss']
})
export class SiteMinderRateDialogComponent implements OnInit, OnDestroy {

  public rateControl = new FormControl();
  public date: Date;
  public channel: LocalObject<Channel, number>;
  public ratePlanTitle: string;
  public lodgingType: LocalObject<LodgingType, number>;
  public subscriptionHandler = new SubscriptionHandler();

  constructor(
    public dialogRef: MatDialogRef<SiteMinderRateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BehaviorSubject<RateInfo>
  ) { }

  ngOnInit() {
    this.subscriptionHandler.register(this.data.pipe(
      tap(data => {
        const { date, channel, rate, ratePlanTitle, lodgingType } = data;
        this.date = date;
        this.channel = channel;
        this.ratePlanTitle = ratePlanTitle;
        this.lodgingType = lodgingType;
        if (rate) {
          this.rateControl.setValue(rate.object.rate);
        } else {
          this.rateControl.setValue(0);
        }
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
