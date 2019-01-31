import { Component, OnInit } from '@angular/core';
import { InvoicePayment, InvoicePaymentsAppState } from '@skysmack/packages-invoices';
import { NgInvoicePaymentsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgInvoicePaymentsFieldsConfig, NgInvoicePaymentFormDependencies } from '@skysmack/ng-packages';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { NgInvoicePaymentsStore } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-invoice-payments-edit',
  templateUrl: './invoice-payments-edit.component.html',
  styleUrls: ['./invoice-payments-edit.component.scss']
})
export class InvoicePaymentsEditComponent extends DocumentRecordFormComponent<InvoicePaymentsAppState, InvoicePayment, number, NgInvoicePaymentFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgInvoicePaymentsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgInvoicePaymentsFieldsConfig,
    public store: NgInvoicePaymentsStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
