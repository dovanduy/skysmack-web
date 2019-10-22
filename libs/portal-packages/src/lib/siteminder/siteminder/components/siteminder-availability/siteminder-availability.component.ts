import { Component, OnInit, Input } from '@angular/core';
import { Availability } from '@skysmack/packages-siteminder';

@Component({
  selector: 'ss-siteminder-availability',
  templateUrl: './siteminder-availability.component.html',
  styleUrls: ['./siteminder-availability.component.scss']
})
export class SiteminderAvailabilityComponent implements OnInit {

  @Input() public data: Availability;
  public available: number;
  public availableModifier: number;
  public availableAfterModification: number;

  constructor() { }

  ngOnInit() {
    if (this.data) {
      this.available = this.data.available;
      this.availableModifier = this.data.availableModifier;
      this.availableAfterModification = (this.available ? this.available : 0) + (this.availableModifier ? this.availableModifier : 0);
    }
  }

}
