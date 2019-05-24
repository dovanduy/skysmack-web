import { Component, OnInit } from '@angular/core';
import { InvoiceItem, InvoiceItemsAppState } from '@skysmack/packages-invoices';
import { NgInvoiceItemsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { NgInvoiceItemsStore } from '@skysmack/ng-packages';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgInvoiceItemsFieldsConfig } from '../../ng-invoice-items-fields-config';

@Component({
  selector: 'ss-invoice-items-edit',
  templateUrl: './invoice-items-edit.component.html'
})
export class InvoiceItemsEditComponent extends DocumentRecordFormComponent<InvoiceItemsAppState, InvoiceItem, number> implements OnInit {

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
    super.ngOnInit();
    this.setEditFields();
  }
}
