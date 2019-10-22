import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { RateInfo } from '../../../models/rate-info';
import { Channel } from '@skysmack/packages-siteminder';
import { LodgingType } from '@skysmack/packages-lodgings';

@Component({
  selector: 'ss-siteminder-rate-dialog',
  templateUrl: './siteminder-rate-dialog.component.html',
  styleUrls: ['./siteminder-rate-dialog.component.scss']
})
export class SiteMinderRateDialogComponent implements OnInit {

  public rateControl = new FormControl();
  public date: Date;
  public channel: Channel;
  public ratePlanTitle: string;
  public lodgingType: LodgingType;

  constructor(
    public dialogRef: MatDialogRef<SiteMinderRateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RateInfo
  ) { }

  ngOnInit() {
    const { date, channel, rate, ratePlanTitle, lodgingType } = this.data;
    this.date = date;
    this.channel = channel;
    this.ratePlanTitle = ratePlanTitle;
    this.lodgingType = lodgingType;
    this.rateControl.setValue(rate.rate);
  }

  public ok() {
    this.dialogRef.close();
  }

  public cancel() {
    this.dialogRef.close();
  }
}
