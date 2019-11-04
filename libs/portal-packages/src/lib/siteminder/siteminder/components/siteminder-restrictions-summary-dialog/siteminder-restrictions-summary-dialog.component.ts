import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { Channel, LodgingTypeRate } from '@skysmack/packages-siteminder';
import { SiteMinderQueueService } from '../../../services/siteminder-queue.service';
import { SubscriptionHandler, getLocalDate } from '@skysmack/framework';
import { Router } from '@angular/router';

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
  private subscriptionHandler = new SubscriptionHandler();

  constructor(
    private router: Router,
    private queueService: SiteMinderQueueService,
    public dialogRef: MatDialogRef<SiteMinderRestrictionsSummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.packagePath = this.router.url.split('/')[1];
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public ok(): void {
    this.dialogRef.close();
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  private setRate(channel: Channel, rate: LodgingTypeRate, lodgingTypeId: number, ratePlanId: number): void {
    const dateOnlyString = getLocalDate(this.date);
  }
}
