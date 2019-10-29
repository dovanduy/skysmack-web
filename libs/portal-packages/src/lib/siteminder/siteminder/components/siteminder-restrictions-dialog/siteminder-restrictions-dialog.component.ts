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

  public form: FormGroup;
  public formReady: boolean;
  public date: Date;
  private packagePath: string;

  constructor(
    private router: Router,
    private queueService: SiteMinderQueueService,
    public dialogRef: MatDialogRef<SiteMinderRestrictionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.packagePath = this.router.url.split('/')[1];
  }

  ngOnDestroy() {
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
  }
}