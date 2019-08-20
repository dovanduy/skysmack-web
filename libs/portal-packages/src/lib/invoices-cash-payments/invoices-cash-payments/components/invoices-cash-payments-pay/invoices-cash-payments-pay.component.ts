import { Component, OnInit, Inject } from '@angular/core';
import { CashPayment, InvoicesCashPaymentsAppState } from '@skysmack/packages-invoices-cash-payments';
import { NgInvoicesCashPaymentsActions, NgInvoicesCashPaymentsStore } from '@skysmack/ng-invoices-cash-payments';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgInvoicesCashPaymentsFieldsConfig } from '../../ng-invoices-cash-payments-fields-config';
import { map, take, switchMap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { toLocalObject, API_DOMAIN_INJECTOR_TOKEN, ApiDomain, LocalObject } from '@skysmack/framework';
import { Invoice } from '@skysmack/packages-invoices';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { NgInvoicesActions, NgInvoicesStore } from '@skysmack/ng-invoices';

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
    @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain,
    public dialogRef: MatDialogRef<InvoicesCashPaymentsPayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { packagePath: string, value: LocalObject<Invoice, Number> }
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setFields();
  }

  protected setPackagePath() {
    this.packagePath = this.data.packagePath;
  }

  protected setFields() {
    const invoiceId$ = of(this.data.value.object.id);
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

          return this.fieldsConfig.getFields(loadedPackage, this.additionalPaths, toLocalObject(entity));
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

  protected create(fh: FormHelper) {
    fh.formValid(() => {
      const localObject = this.extractFormValues(fh);
      this.editorItem ? localObject.localId = this.editorItem.localId : localObject.localId = localObject.localId;
      this.actions.add([localObject], this.packagePath);
      this.editorNavService.hideEditorNav();
      this.dialogRef.close();
    });
  }
}
