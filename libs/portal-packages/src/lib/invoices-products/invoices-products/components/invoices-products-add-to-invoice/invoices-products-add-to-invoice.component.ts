import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { RecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgInvoicesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgInvoicesStore } from '@skysmack/ng-packages';
import { FormHelper } from '@skysmack/ng-ui';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalObject } from '@skysmack/framework';
import { Product } from 'libs/packages/products/src';
import { NgInvoicesProductsAddToInvoiceFieldsConfig } from '../../ng-invoices-products-add-to-invoice-fields-config';

/**
 * This component is used when clicking a product in order to add it to an invoice.
 */

@Component({
  selector: 'ss-invoices-products-add-to-invoice',
  templateUrl: './invoices-products-add-to-invoice.component.html'
})
export class InvoicesProductsAddToInvoiceComponent extends RecordFormComponent<any, any, unknown> implements OnInit, OnDestroy {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgInvoicesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgInvoicesProductsAddToInvoiceFieldsConfig,
    public store: NgInvoicesStore,
    public dialogRef: MatDialogRef<InvoicesProductsAddToInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { packagePath: string, value: LocalObject<Product, Number> }
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    this.fieldsConfig.productId = this.data.value.object.id;
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
      this.editorNavService.hideEditorNav();
      this.dialogRef.close();
    });
  }
}
