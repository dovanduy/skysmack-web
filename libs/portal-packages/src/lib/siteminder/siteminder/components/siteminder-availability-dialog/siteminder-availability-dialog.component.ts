import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Availability } from '@skysmack/packages-siteminder';
import {  SubscriptionHandler } from '@skysmack/framework';
import { Router } from '@angular/router';
import { SiteMinderQueueService } from '../../../services/siteminder-queue.service';
import { LodgingCell } from '../../../models/lodging-cell';
import * as _moment from 'moment';
const moment = _moment;
@Component({
  selector: 'ss-siteminder-availability-dialog',
  templateUrl: './siteminder-availability-dialog.component.html',
  styleUrls: ['./siteminder-availability-dialog.component.scss']
})
export class SiteMinderAvailabilityDialogComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  
  public date: string;
  public lodgingTypeCell: LodgingCell;
  
  public availableAfterModification$: Observable<number>;
  private packagePath: string;
  private newAvailableModifier: number;
  private subscriptionHandler = new SubscriptionHandler();

  constructor(
    private router: Router,
    private queueService: SiteMinderQueueService,
    private dialogRef: MatDialogRef<SiteMinderAvailabilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { date: Date, lodgingTypeCell: LodgingCell }
  ) { }

  ngOnInit() {
    this.packagePath = this.router.url.split('/')[1];
    this.lodgingTypeCell = this.data.lodgingTypeCell;
    this.date = moment(this.data.date).format('YYYY-MM-DD');

    let defaultAvailable = 0;
    if (this.lodgingTypeCell.availability) {
      defaultAvailable = this.lodgingTypeCell.availability.object.availableModifier;
    }

    this.form = new FormGroup({});
    const formControl = new FormControl(defaultAvailable);
    this.form.addControl('availableModifier', formControl);

    this.availableAfterModification$ = this.form.valueChanges.pipe(
      startWith({ availableModifier: defaultAvailable }),
      map(changes => {
        this.newAvailableModifier = changes.availableModifier;
        if (this.lodgingTypeCell.availability) {
          return this.lodgingTypeCell.availability.object.available + changes.availableModifier;
        }
        return changes.availableModifier;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public saveChanges() {
    if (!this.lodgingTypeCell.availability || this.lodgingTypeCell.availability.object.availableModifier !== this.newAvailableModifier) {
      const availability = new Availability({        
        start: this.date,
        end: this.date,
        lodgingTypeId: this.lodgingTypeCell.lodgingType.object.id,
        availableModifier: this.newAvailableModifier
      });
      this.queueService.updateAvailability(this.packagePath, availability);

      this.dialogRef.close(availability);
    } else {
      this.dialogRef.close();
    }
  }
}
