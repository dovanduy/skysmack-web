import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
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

  public form: FormGroup;
  public formReady: boolean;
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

        this.form = new FormGroup({});
        const formControl = rate ? new FormControl(rate.object.rate) : new FormControl(0)
        this.form.addControl(channel.object.id.toString(), formControl);
        this.formReady = true;
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
