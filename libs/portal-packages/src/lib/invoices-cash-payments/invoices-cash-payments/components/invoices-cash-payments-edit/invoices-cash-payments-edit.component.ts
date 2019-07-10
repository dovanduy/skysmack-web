import { Component, OnInit } from '@angular/core';
import { CashPayment, InvoicesCashPaymentsAppState } from '@skysmack/packages-invoices-cash-payments';
import { NgInvoicesCashPaymentsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgInvoicesCashPaymentsStore } from '@skysmack/ng-packages';
import { NgInvoicesCashPaymentsFieldsConfig } from '../../ng-invoices-cash-payments-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-invoices-cash-payments-edit',
  templateUrl: './invoices-cash-payments-edit.component.html'
})
export class InvoicesCashPaymentsEditComponent extends RecordFormComponent<InvoicesCashPaymentsAppState, CashPayment, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgInvoicesCashPaymentsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgInvoicesCashPaymentsFieldsConfig,
    public store: NgInvoicesCashPaymentsStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
