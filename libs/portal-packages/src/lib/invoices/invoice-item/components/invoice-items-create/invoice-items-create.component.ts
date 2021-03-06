import { Component, OnInit } from '@angular/core';
import { InvoiceItem, InvoiceItemsAppState } from '@skysmack/packages-invoices';
import { NgInvoiceItemsActions, NgInvoiceItemsStore } from '@skysmack/ng-invoices';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-fields';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgInvoiceItemsFieldsConfig } from '../../ng-invoice-items-fields-config';
import { map, take } from 'rxjs/operators';
import { SubscriptionHandler } from '@skysmack/framework';

@Component({
  selector: 'ss-invoice-items-create',
  templateUrl: './invoice-items-create.component.html'
})
export class InvoiceItemsCreateComponent extends DocumentRecordFormComponent<InvoiceItemsAppState, InvoiceItem, number> implements OnInit {

  protected subscriptionHandler = new SubscriptionHandler();

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgInvoiceItemsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgInvoiceItemsFieldsConfig,
    public store: NgInvoiceItemsStore,
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig, fieldActions);
  }

  ngOnInit() {
    this.subscriptionHandler.register(this.activatedRoute.parent.params.pipe(
      map(params => {
        this.fieldsConfig.inventoryId = params.invoiceId;
      }),
      take(1)
    ).subscribe());

    super.ngOnInit();
    this.setCreateFields();
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

}
