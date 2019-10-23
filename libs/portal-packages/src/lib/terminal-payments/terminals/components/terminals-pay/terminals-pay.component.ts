import { Component, OnInit, Inject } from '@angular/core';
import { NgInvoicesActions, NgInvoicesStore } from '@skysmack/ng-invoices';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { map, take, switchMap, tap, catchError } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { toLocalObject, LocalObject, API_DOMAIN_INJECTOR_TOKEN, ApiDomain } from '@skysmack/framework';
import { NgTransactionRequestFieldsConfig } from '../../ng-transaction-request-fields-config';
import { TransactionRequest, TerminalsAppState } from '@skysmack/packages-terminal-payments';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { Invoice } from 'libs/packages/invoices/src';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { NgTerminalsActions, NgTerminalsStore, NgTerminalsRequests } from '@skysmack/ng-terminal-payments';

@Component({
  selector: 'ss-terminals-pay',
  templateUrl: './terminals-pay.component.html'
})
export class TerminalsPayComponent extends RecordFormComponent<TerminalsAppState, any, unknown> implements OnInit {

  public disableButton = false;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgTerminalsActions,
    public invoicesActions: NgInvoicesActions,
    public invoicesStore: NgInvoicesStore,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgTransactionRequestFieldsConfig,
    public store: NgTerminalsStore,
    public requests: NgTerminalsRequests,
    @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain,
    public dialogRef: MatDialogRef<TerminalsPayComponent>,
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

    // Request invoice from API
    combineLatest(
      invoiceId$,
      this.loadedPackage$
    ).pipe(
      map(([invoiceId, loadedPackage]) => this.invoicesActions.getSingle(loadedPackage._package.dependencies[1], invoiceId)),
      take(1)
    ).subscribe();

    // Get invoice from state + make fields
    this.fields$ = combineLatest([
      invoiceId$,
      this.loadedPackage$
    ]).pipe(
      switchMap(([invoiceId, loadedPackage]) => this.invoicesStore.getSingle(loadedPackage._package.dependencies[1], invoiceId).pipe(
        switchMap(invoice => {
          return this.fieldsConfig.getFields(loadedPackage, toLocalObject({
            invoiceId: invoice.object.id,
            clientId: undefined,
            terminalId: undefined,
            amount: undefined,
            currencyCode: undefined,
            connection: undefined
          }));
        })
      ))
    );
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      const transactionRequest = { ...fh.form.value } as TransactionRequest;

      // Set clientId and terminalId on the correct properties
      transactionRequest.clientId = (transactionRequest.connection as any).clientId;
      transactionRequest.terminalId = (transactionRequest.connection as any).terminalId;

      // Remove the front end only prop
      delete transactionRequest.connection;

      // Prepare request
      this.disableButton = true;

      // Request
      this.requests.pay(this.packagePath, transactionRequest).pipe(
        tap(() => {
          this.disableButton = false;
          this.editorNavService.hideEditorNav();
          this.dialogRef.close();
        }),
        catchError(error => {
          this.disableButton = false;
          this.editorNavService.hideEditorNav();
          this.dialogRef.close();
          console.error(error);
          return of(error);
        }),
        take(1)
      ).subscribe();
    });
  }
}
