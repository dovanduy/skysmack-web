import { Component, OnInit } from '@angular/core';
import { CashPayment, InvoicesCashPaymentsAppState } from '@skysmack/packages-invoices-cash-payments';
import { NgInvoicesCashPaymentsActions, NgInvoicesActions, NgInvoicesStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgInvoicesCashPaymentsStore } from '@skysmack/ng-packages';
import { NgInvoicesCashPaymentsFieldsConfig } from '../../ng-invoices-cash-payments-fields-config';
import { map, take, switchMap, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { LocalObject, toLocalObject, RSQLFilterBuilder } from '@skysmack/framework';

@Component({
  selector: 'ss-invoices-cash-payments-pay',
  templateUrl: './invoices-cash-payments-pay.component.html'
})
export class InvoicesCashPaymentsPayComponent extends RecordFormComponent<InvoicesCashPaymentsAppState, CashPayment, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgInvoicesCashPaymentsActions,
    public invoicesActions: NgInvoicesActions,
    public invoicesStore: NgInvoicesStore,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgInvoicesCashPaymentsFieldsConfig,
    public store: NgInvoicesCashPaymentsStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setFields();
  }

  protected setFields() {
    const invoiceId$ = this.activatedRoute.parent.params.pipe(map(params => params.invoiceId));
    combineLatest(
      invoiceId$,
      this.loadedPackage$
    ).pipe(
      map(([invoiceId, loadedPackage]) => this.invoicesActions.getSingle(loadedPackage._package.dependencies[0], invoiceId)),
      take(1)
    ).subscribe();

    this.fields$ = combineLatest(
      invoiceId$,
      this.loadedPackage$
    ).pipe(
      switchMap(([invoiceId, loadedPackage]) => this.invoicesStore.getSingle(loadedPackage._package.dependencies[0], invoiceId).pipe(
        switchMap(invoice => {
          const entity = new CashPayment({
            currencyCode: invoice.object.currencyCode,
            invoiceId: invoice.object.id
          });

          return this.fieldsConfig.getFields(loadedPackage, toLocalObject(entity));
        }),
        map(fields => {
          const invoiceIdField = fields.find(field => field.key === 'invoiceId');
          invoiceIdField ? invoiceIdField.disabled = true : invoiceIdField.disabled;
          const currencyCodeField = fields.find(field => field.key === 'currencyCode');
          currencyCodeField ? currencyCodeField.disabled = true : currencyCodeField.disabled;
          return fields;
        })
      ))
    );
  }
}
