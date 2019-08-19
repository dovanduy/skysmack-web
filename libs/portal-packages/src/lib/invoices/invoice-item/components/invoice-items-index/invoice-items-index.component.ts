import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgInvoiceItemsActions, NgInvoiceItemsStore } from '@skysmack/ng-invoices';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { InvoiceItem, InvoiceItemsAppState, INVOICE_ITEMS_AREA_KEY } from '@skysmack/packages-invoices';
import { MenuItem, PagedQuery } from '@skysmack/framework';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgInvoiceItemsFieldsConfig } from '../../ng-invoice-items-fields-config';
import { RSQLFilterBuilder } from '@skysmack/framework';
import { take, map } from 'rxjs/operators';
import { DocumentRecordIndexComponent } from '@skysmack/portal-fields';


@Component({
  selector: 'ss-invoice-items-index',
  templateUrl: './invoice-items-index.component.html'
})
export class InvoiceItemsIndexComponent extends DocumentRecordIndexComponent<InvoiceItemsAppState, InvoiceItem, number> implements OnInit {
  public static COMPONENT_KEY = 'invoice-items-index';
  public componentKey = InvoiceItemsIndexComponent.COMPONENT_KEY;

  public areaKey: string = INVOICE_ITEMS_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgInvoiceItemsActions,
    public redux: NgSkysmackStore,
    public store: NgInvoiceItemsStore,
    public fieldsConfig: NgInvoiceItemsFieldsConfig,
    public fieldActions: NgFieldActions,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, fieldActions, menuItemActionProviders, title);
  }

  ngOnInit() {
    // Only get items related to inventoryId
    this.activatedRoute.params.pipe(
      map(params => {
        const filter = new RSQLFilterBuilder();
        const invoiceId = params.invoiceId;
        filter.column('inventoryId').in([invoiceId]);
        this.pagedQuery.rsqlFilter = filter;
      }),
      take(1)
    ).subscribe();

    this.additionalPaths = ['items'];
    super.ngOnInit();
  }
}
