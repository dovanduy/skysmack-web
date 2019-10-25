import { Component, OnInit, Input } from '@angular/core';
import { Availability, LodgingTypeAvailability, LodgingTypeAvailabilityKey } from '@skysmack/packages-siteminder';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SiteMinderAvailabilityDialogComponent } from '../siteminder-availability-dialog/siteminder-availability-dialog.component';
import { LocalObject } from '@skysmack/framework';

@Component({
  selector: 'ss-siteminder-availability',
  templateUrl: './siteminder-availability.component.html',
  styleUrls: ['./siteminder-availability.component.scss']
})
export class SiteMinderAvailabilityComponent implements OnInit {
  @Input() public data: LocalObject<LodgingTypeAvailability, LodgingTypeAvailabilityKey>;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  public openDialog(): void {
    this.dialog.open(SiteMinderAvailabilityDialogComponent, {
      data: this.data
    } as MatDialogConfig)
  }
}
