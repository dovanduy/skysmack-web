import { Component, OnInit } from '@angular/core';
import { InvoiceItem, InvoiceItemsAppState } from '@skysmack/packages-invoices';
import { NgInvoiceItemsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgInvoiceItemsFieldsConfig, NgInvoiceItemFormDependencies } from '@skysmack/ng-packages';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { NgInvoiceItemsStore } from '@skysmack/ng-packages';
import { NgFieldActions, NgFieldStore } from '@skysmack/ng-redux';

@Component({
  selector: 'ss-invoice-items-edit',
  templateUrl: './invoice-items-edit.component.html'
})
export class InvoiceItemsEditComponent extends DocumentRecordFormComponent<InvoiceItemsAppState, InvoiceItem, number, NgInvoiceItemFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgInvoiceItemsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgInvoiceItemsFieldsConfig,
    public store: NgInvoiceItemsStore,
    public fieldActions: NgFieldActions,
    public fieldStore: NgFieldStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig, fieldActions, fieldStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
