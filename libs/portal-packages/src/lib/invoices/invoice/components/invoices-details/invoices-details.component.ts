import { Component, OnInit } from '@angular/core';
import { BaseComponent, EditorNavService } from '@skysmack/portal-ui';
import { InvoicesAppState } from 'libs/packages/invoices/src';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgInvoicesFieldsConfig } from '../../ng-invoices-fields-config';
import { Observable, combineLatest } from 'rxjs';
import { Field } from '@skysmack/ng-ui';
import { switchMap } from 'rxjs/operators';
import { NgInvoicesActions, NgInvoicesStore } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-invoices-details',
  templateUrl: './invoices-details.component.html'
})
export class InvoicesDetailsComponent extends BaseComponent<InvoicesAppState, number> implements OnInit {

  public fields$: Observable<Field[]>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public actions: NgInvoicesActions,
    public store: NgInvoicesStore,
    public fieldsConfig: NgInvoicesFieldsConfig,
    public editorNavService: EditorNavService
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.editorNavService.showEditorNav();
    this.actions.getSingle(this.packagePath, this.entityId);

    this.fields$ = combineLatest(
      this.loadedPackage$,
      this.store.getSingle(this.packagePath, this.entityId)
    ).pipe(switchMap(values => this.fieldsConfig.getFields(values[0], values[1])));
  }

}
