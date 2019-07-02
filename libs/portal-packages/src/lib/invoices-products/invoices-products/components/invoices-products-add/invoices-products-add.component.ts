import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { RecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgInvoicesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgInvoicesStore } from '@skysmack/ng-packages';
import { NgInvoicesProductsFieldsConfig } from '../../ng-invoices-products-fields-config';
import { FormHelper } from '@skysmack/ng-ui';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalObject } from '@skysmack/framework';
import { Product } from 'libs/packages/products/src';

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
    public dialogRef: MatDialogRef<InvoicesProductsAddComponent>,
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
      console.log(values);
      this.dialogRef.close();
    });
  }
}
