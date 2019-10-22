import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ss-siteminder-availability-dialog',
  templateUrl: './siteminder-availability-dialog.component.html',
  styleUrls: ['./siteminder-availability-dialog.component.scss']
})
export class SiteMinderAvailabilityDialogComponent implements OnInit {

  // @Input() public data: Availability;
  public available: number;
  public availableModifier: number;
  public availableAfterModification: number;

  constructor() { }

  ngOnInit() {
  }

}
