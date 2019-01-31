import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponet } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgInvoiceItemsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgInvoiceItemsStore } from '@skysmack/ng-packages';
import { InvoiceItem, InvoiceItemsAppState } from '@skysmack/packages-invoices';
import { NgInvoiceItemsMenu } from './../../ng-invoice-items-menu';
import { EntityAction } from '@skysmack/ng-ui';


@Component({
  selector: 'ss-invoice-items-index',
  templateUrl: './invoice-items-index.component.html',
  styleUrls: ['./invoice-items-index.component.scss']
})
export class InvoiceItemsIndexComponent extends DocumentRecordIndexComponet<InvoiceItemsAppState, InvoiceItem, number> implements OnInit {

  public displayedColumns = ['description', 'units', 'unitPrice', 'unitDiscount', 'unitTax', 'inventoryId'];
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgInvoiceItemsActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgInvoiceItemsStore,
    public sidebarMenu: NgInvoiceItemsMenu
  ) {
    super(router, activatedRoute, actions, redux, store);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
