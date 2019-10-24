import { Component, OnInit, Input } from '@angular/core';
import { Availability, LodgingTypeAvailability } from '@skysmack/packages-siteminder';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SiteMinderAvailabilityDialogComponent } from '../siteminder-availability-dialog/siteminder-availability-dialog.component';

@Component({
  selector: 'ss-siteminder-availability',
  templateUrl: './siteminder-availability.component.html',
  styleUrls: ['./siteminder-availability.component.scss']
})
export class SiteMinderAvailabilityComponent implements OnInit {

  @Input() public data: LodgingTypeAvailability;
  public available: number;
  public availableModifier: number;
  public availableAfterModification: number;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    if (this.data) {
      this.available = this.data.available;
      this.availableModifier = this.data.availableModifier;
      this.availableAfterModification = (this.available ? this.available : 0) + (this.availableModifier ? this.availableModifier : 0);
    }
  }

  public openDialog(): void {
    this.dialog.open(SiteMinderAvailabilityDialogComponent, {
      data: this.data
    } as MatDialogConfig)
  }
}
