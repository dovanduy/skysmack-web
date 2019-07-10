import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { EditorNavService } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgInvoicesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgInvoicesStore } from '@skysmack/ng-packages';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgInvoicesProductsAddProductsFieldsConfig } from '../../ng-invoices-products-add-products-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

/**
 * This component is used when clicking an invoice item in order to add products to it.
 */

@Component({
  selector: 'ss-invoices-products-add-products',
  templateUrl: './invoices-products-add-products.component.html'
})
export class InvoicesProductsAddProductsComponent extends RecordFormComponent<any, any, unknown> implements OnInit, OnDestroy {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgInvoicesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgInvoicesProductsAddProductsFieldsConfig,
    public store: NgInvoicesStore,
    public dialogRef: MatDialogRef<InvoicesProductsAddProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { packagePath: string }
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    this.fieldsConfig.invoiceId = Number(this.router.url.split('/items/')[1]);
    super.ngOnInit();
    this.setCreateFields();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  protected setPackagePath() {
    this.packagePath = this.data.packagePath;
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      const values = fh.form.value;
      console.log(values);
      this.editorNavService.hideEditorNav();
      this.dialogRef.close();
    });
  }
}
