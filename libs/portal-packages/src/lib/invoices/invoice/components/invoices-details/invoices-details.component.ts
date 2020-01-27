import { Component, OnInit } from '@angular/core';
import { EditorNavService, EntityComponentPageTitle } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgInvoicesFieldsConfig } from '../../ng-invoices-fields-config';
import { NgInvoicesActions, NgInvoicesStore } from '@skysmack/ng-invoices';
import { InvoicesAppState, Invoice } from '@skysmack/packages-invoices';
import { DetailsBaseComponent } from '@skysmack/portal-fields';
import { LocalObject } from '@skysmack/framework';
import { InvoicesIndexComponent } from '../invoices-index/invoices-index.component';

@Component({
  selector: 'ss-invoices-details',
  templateUrl: './invoices-details.component.html'
})
export class InvoicesDetailsComponent extends DetailsBaseComponent<InvoicesAppState, number> implements OnInit {

  public componentKey = InvoicesIndexComponent.COMPONENT_KEY;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public actions: NgInvoicesActions,
    public store: NgInvoicesStore,
    public fieldsConfig: NgInvoicesFieldsConfig,
    public editorNavService: EditorNavService,
    public title: EntityComponentPageTitle
  ) {
    super(router, activatedRoute, skysmackStore, actions, store, fieldsConfig, editorNavService, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected getTitle(record: LocalObject<Invoice, number>): string {
    return `${record.object.description}`;
  }
}
