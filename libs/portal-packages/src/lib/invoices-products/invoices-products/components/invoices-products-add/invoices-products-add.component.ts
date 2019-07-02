import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgInvoicesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgInvoicesStore } from '@skysmack/ng-packages';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgInvoicesProductsFieldsConfig } from '../../ng-invoices-products-fields-config';
import { FormHelper } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-invoices-products-add',
  templateUrl: './invoices-products-add.component.html'
})
export class InvoicesProductsAddComponent extends RecordFormComponent<any, any, unknown> implements OnInit, OnDestroy {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgInvoicesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgInvoicesProductsFieldsConfig,
    public store: NgInvoicesStore,
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.editorNavService.showEditorNav()
    this.setCreateFields();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.editorNavService.hideEditorNav();
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      const values = fh.form.value;
      console.log(values);
      this.editorNavService.hideEditorNav();
    });
  }

}
