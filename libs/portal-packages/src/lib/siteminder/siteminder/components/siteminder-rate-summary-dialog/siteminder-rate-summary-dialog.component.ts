import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { RateSummary } from '../../../models/rate-summary';
import { Channel } from '@skysmack/packages-siteminder';

@Component({
  selector: 'ss-siteminder-rate-summary-dialog',
  templateUrl: './siteminder-rate-summary-dialog.component.html',
  styleUrls: ['./siteminder-rate-summary-dialog.component.scss']
})
export class SiteMinderRateSummaryDialogComponent implements OnInit {
  public date: Date;
  public form: FormGroup;
  public channels: Channel[];

  constructor(
    public dialogRef: MatDialogRef<SiteMinderRateSummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RateSummary
  ) { }

  ngOnInit() {
    const { date, channels, rates } = this.data;
    this.date = date;
    this.channels = channels;

    this.form = new FormGroup({});
    channels.forEach(channel => {
      const rate = rates.find(rate => rate.channelId === channel.id);
      const formControl = new FormControl(rate ? rate.rate : 0);
      this.form.addControl(channel.name, formControl);
    });
  }

  public ok() {
    this.dialogRef.close();
  }

  public cancel() {
    this.dialogRef.close();
  }
}
