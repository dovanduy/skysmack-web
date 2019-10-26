import { Component, OnInit, Input } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { RateInfo } from '../../../models/rate-info';
import { SiteMinderRateDialogComponent } from '../siteminder-rate-dialog/siteminder-rate-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ss-siteminder-rate',
  templateUrl: './siteminder-rate.component.html',
  styleUrls: ['./siteminder-rate.component.scss']
})
export class SiteMinderRateComponent implements OnInit {

  @Input() public data: BehaviorSubject<RateInfo>;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  public openDialog(): void {
    this.dialog.open(SiteMinderRateDialogComponent, {
      data: this.data
    } as MatDialogConfig)
  }
}
