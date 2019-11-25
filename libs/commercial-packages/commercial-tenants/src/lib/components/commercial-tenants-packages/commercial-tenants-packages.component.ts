import { Component, OnInit } from '@angular/core';
import { CommercialTenantsService } from '../../services/commercial-tenants.service';
import { SubscriptionHandler } from '@skysmack/framework';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ss-commercial-tenants-packages',
  templateUrl: './commercial-tenants-packages.component.html',
  styleUrls: ['./commercial-tenants-packages.component.scss']
})
export class CommercialTenantsPackagesComponent implements OnInit {
  private subscriptionHandler = new SubscriptionHandler();

  constructor(
    public service: CommercialTenantsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }
}
