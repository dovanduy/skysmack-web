import { Component, OnInit } from '@angular/core';
import { NgInvoicesActions, NgInvoicesStore, NgTerminalsActions, NgTerminalsStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { map, take, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { toLocalObject } from '@skysmack/framework';
import { NgTransactionRequestFieldsConfig } from '../../ng-transaction-request-fields-config';
import { TransactionRequest, TerminalsAppState } from '@skysmack/packages-terminal-payments';

@Component({
  selector: 'ss-terminals-pay',
  templateUrl: './terminals-pay.component.html'
})
export class TerminalsPayComponent extends RecordFormComponent<TerminalsAppState, any, unknown> implements OnInit {

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
          const entity = new TransactionRequest({
            // currency: invoice.object.currencyCode
            // invoiceId: invoice.object.id
          });

          return this.fieldsConfig.getFields(loadedPackage, toLocalObject(entity));
        }),
        map(fields => {
          // const invoiceIdField = fields.find(field => field.key === 'invoiceId');
          // invoiceIdField ? invoiceIdField.disabled = true : invoiceIdField.disabled;
          // const currencyCodeField = fields.find(field => field.key === 'currencyCode');
          // currencyCodeField ? currencyCodeField.disabled = true : currencyCodeField.disabled;
          return fields;
        })
      ))
    );
  }
}
