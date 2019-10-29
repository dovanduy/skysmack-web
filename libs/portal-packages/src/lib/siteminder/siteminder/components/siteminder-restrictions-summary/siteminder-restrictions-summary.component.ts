import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SiteMinderRestrictionsSummaryDialogComponent } from '../siteminder-restrictions-summary-dialog/siteminder-restrictions-summary-dialog.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ss-siteminder-restrictions-summary',
  templateUrl: './siteminder-restrictions-summary.component.html',
  styleUrls: ['./siteminder-restrictions-summary.component.scss']
})
export class SiteMinderRestrictionsSummaryComponent implements OnInit {

  @Input() public data: any;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  public openDialog(): void {
    this.dialog.open(SiteMinderRestrictionsSummaryDialogComponent, {
      data: this.data
    } as MatDialogConfig)
  }
}
