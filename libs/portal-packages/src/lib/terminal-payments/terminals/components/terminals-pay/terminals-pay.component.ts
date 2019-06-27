import { Component, OnInit, Inject } from '@angular/core';
import { NgInvoicesActions, NgInvoicesStore, NgTerminalsActions, NgTerminalsStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { map, take, switchMap, tap, catchError } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { toLocalObject, API_DOMAIN_INJECTOR_TOKEN, ApiDomain } from '@skysmack/framework';
import { NgTransactionRequestFieldsConfig } from '../../ng-transaction-request-fields-config';
import { TransactionRequest, TerminalsAppState } from '@skysmack/packages-terminal-payments';
import { FormHelper } from '@skysmack/ng-ui';
import { HttpClient } from '@angular/common/http';

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
    public httpClient: HttpClient,
    @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain

  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setFields();
  }

  protected setFields() {
    const invoiceId$ = this.activatedRoute.parent.params.pipe(map(params => params.invoiceId));

    // Request invoice from API
    combineLatest(
      invoiceId$,
      this.loadedPackage$
    ).pipe(
      map(([invoiceId, loadedPackage]) => this.invoicesActions.getSingle(loadedPackage._package.dependencies[0], invoiceId)),
      take(1)
    ).subscribe();

    // Get invoice from state + make fields
    this.fields$ = combineLatest(
      invoiceId$,
      this.loadedPackage$
    ).pipe(
      switchMap(([invoiceId, loadedPackage]) => this.invoicesStore.getSingle(loadedPackage._package.dependencies[0], invoiceId).pipe(
        switchMap(invoice => {
          return this.fieldsConfig.getFields(loadedPackage, toLocalObject({
            invoiceId: invoice.object.id,
            clientId: undefined,
            terminalId: undefined,
            amount: undefined,
            currency: undefined,
            connection: undefined
          }));
        })
      ))
    );
  }

  public onSubmit(fh: FormHelper) {
    const transactionRequest = fh.form.value as TransactionRequest;

    // Set clientId and terminalId on the correct properties
    transactionRequest.clientId = (transactionRequest.connection as any).clientId;
    transactionRequest.terminalId = (transactionRequest.connection as any).terminalId;

    // Remove the front end only prop
    delete transactionRequest.connection;

    // Prepare request
    const url = `${this.apiDomain.domain}/actions/request-transaction`;
    this.disableButton = true;

    // Request
    this.httpClient.post(url, transactionRequest, { observe: 'response' }).pipe(
      tap(x => {
        this.disableButton = false;
        console.log(x);
        // if(x.status === '200'){
        // this.router.navigate([this.router.url.substring(0, this.router.url.length - 3), 'processing']);
        // } else if(x.status === ???) {
        // }
      }),
      catchError(error => {
        this.disableButton = false;
        console.error(error);
        return of(error);
      }),
      take(1)
    ).subscribe();
  }
}
