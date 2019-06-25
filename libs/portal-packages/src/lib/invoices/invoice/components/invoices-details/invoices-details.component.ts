import { Component, OnInit } from '@angular/core';
import { EditorNavService, DetailsBaseComponent } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgInvoicesFieldsConfig } from '../../ng-invoices-fields-config';
import { NgInvoicesActions, NgInvoicesStore } from '@skysmack/ng-packages';
import { InvoicesAppState } from '@skysmack/packages-invoices';

@Component({
  selector: 'ss-invoices-details',
  templateUrl: './invoices-details.component.html'
})
export class InvoicesDetailsComponent extends DetailsBaseComponent<InvoicesAppState, number> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public actions: NgInvoicesActions,
    public store: NgInvoicesStore,
    public fieldsConfig: NgInvoicesFieldsConfig,
    public editorNavService: EditorNavService
  ) {
    super(router, activatedRoute, skysmackStore, actions, store, fieldsConfig, editorNavService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
