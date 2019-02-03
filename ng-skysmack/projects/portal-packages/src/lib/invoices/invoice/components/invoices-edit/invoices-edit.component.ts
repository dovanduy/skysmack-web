import { Component, OnInit } from '@angular/core';
import { Invoice, InvoicesAppState } from '@skysmack/packages-invoices';
import { NgInvoicesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgInvoicesFieldsConfig, NgInvoiceFormDependencies } from '@skysmack/ng-packages';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { NgInvoicesStore } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-invoices-edit',
  templateUrl: './invoices-edit.component.html',
  styleUrls: ['./invoices-edit.component.scss']
})
export class InvoicesEditComponent extends DocumentRecordFormComponent<InvoicesAppState, Invoice, number, NgInvoiceFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgInvoicesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgInvoicesFieldsConfig,
    public store: NgInvoicesStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}