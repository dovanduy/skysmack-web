import { Component, OnInit } from '@angular/core';
import { Invoice, InvoicesAppState } from '@skysmack/packages-invoices';
import { NgInvoicesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { NgInvoicesStore } from '@skysmack/ng-packages';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgInvoicesFieldsConfig } from '../../ng-invoices-fields-config';

@Component({
  selector: 'ss-invoices-create',
  templateUrl: './invoices-create.component.html'
})
export class InvoicesCreateComponent extends DocumentRecordFormComponent<InvoicesAppState, Invoice, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgInvoicesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgInvoicesFieldsConfig,
    public store: NgInvoicesStore,
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig, fieldActions);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

}
