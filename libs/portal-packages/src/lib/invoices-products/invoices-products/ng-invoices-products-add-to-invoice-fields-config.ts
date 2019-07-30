import { Injectable } from '@angular/core';
import { LocalObject, PagedQuery } from '@skysmack/framework';

import { NgInvoicesProductsValidation } from '@skysmack/ng-packages';
import { LoadedPackage, getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { INVOICES_PRODUCTS_AREA_KEY } from '@skysmack/packages-invoices-products';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map, take, switchMap } from 'rxjs/operators';
import { Validators } from '@angular/forms';
import { FormRule, SelectField, Field } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { SelectFieldComponent, IntFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { NgInvoicesActions, NgInvoicesStore } from '@skysmack/ng-invoices';

@Injectable({ providedIn: 'root' })
export class NgInvoicesProductsAddToInvoiceFieldsConfig extends FieldsConfig<any, unknown> {
  public validation = new NgInvoicesProductsValidation();
  public area = INVOICES_PRODUCTS_AREA_KEY;
  public formRules: FormRule[] = [];

  // Unique prop for this fields config
  public productId: number;

  constructor(
    public fieldProviders: FieldProviders,
    public invoiceActions: NgInvoicesActions,
    public invoiceStore: NgInvoicesStore,
    public skysmackStore: NgSkysmackStore
  ) {
    super(fieldProviders);
  }

  protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<any, unknown>): Field[] {
    const invoicesPackage$ = getPackageDendencyAsStream(this.skysmackStore, loadedPackage._package.path, [0]);

    const fields = [
      new SelectField({
        component: SelectFieldComponent,
        value: entity ? entity.object.invoiceId : undefined,
        key: 'invoiceId',
        displayKey: 'invoice',
        displaySubKey: 'object.currencyCode',
        optionsData$: invoicesPackage$.pipe(switchMap(invoicesPackage => this.invoiceStore.get(invoicesPackage.object.path))),
        getDependencies: () => {
          invoicesPackage$.pipe(
            map(invoicesPackage => {
              this.invoiceActions.getPaged(invoicesPackage.object.path, new PagedQuery());
            }),
            take(1)
          ).subscribe();
        },
        displayNameSelector: 'object.currencyCode',
        order: 1,
        validators: [Validators.required]
      }),
      new Field({
        component: IntFieldComponent,
        value: entity ? entity.object.amount : undefined,
        key: 'amount',
        validators: [Validators.required]
      }),
      new Field({
        component: HiddenFieldComponent,
        value: entity ? entity.object.productId : this.productId,
        key: 'productId',
      }),
    ];

    return fields;
  }
}
