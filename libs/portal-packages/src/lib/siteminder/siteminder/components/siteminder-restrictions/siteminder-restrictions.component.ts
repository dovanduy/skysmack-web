import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { SiteMinderRestrictionsDialogComponent } from '../siteminder-restrictions-dialog/siteminder-restrictions-dialog.component';

@Component({
  selector: 'ss-siteminder-restrictions',
  templateUrl: './siteminder-restrictions.component.html',
  styleUrls: ['./siteminder-restrictions.component.scss']
})
export class SiteMinderRestrictionsComponent implements OnInit {
  @Input() public data: BehaviorSubject<any>;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  public openDialog(): void {
    this.dialog.open(SiteMinderRestrictionsDialogComponent, {
      data: this.data
    } as MatDialogConfig)
  }
}
