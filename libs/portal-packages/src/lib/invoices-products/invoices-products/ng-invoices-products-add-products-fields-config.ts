import { Injectable } from '@angular/core';
import { FormRule, SelectField } from '@skysmack/ng-ui';
import { LocalObject, PagedQuery } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';

import { FieldsConfig, FieldProviders, SelectFieldComponent, IntFieldComponent, HiddenFieldComponent } from '@skysmack/portal-ui';
import { NgInvoicesProductsValidation, NgProductsActions, NgProductsStore } from '@skysmack/ng-packages';
import { LoadedPackage, getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { INVOICES_PRODUCTS_AREA_KEY } from '@skysmack/packages-invoices-products';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { map, take, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgInvoicesProductsAddProductsFieldsConfig extends FieldsConfig<any, unknown> {
  public validation = new NgInvoicesProductsValidation();
  public area = INVOICES_PRODUCTS_AREA_KEY;
  public formRules: FormRule[] = [];

  // Unique prop for this fields config
  public invoiceId: number;

  constructor(
    public fieldProviders: FieldProviders,
    public productsActions: NgProductsActions,
    public productsStore: NgProductsStore,
    public skysmackStore: NgSkysmackStore
  ) {
    super(fieldProviders);
  }

  protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<any, unknown>): Field[] {
    const productsPackage$ = getPackageDendencyAsStream(this.skysmackStore, loadedPackage._package.path, [1]);

    const fields = [
      new SelectField({
        component: SelectFieldComponent,
        value: entity ? entity.object.invoiceId : undefined,
        key: 'productId',
        displayKey: 'product',
        displaySubKey: 'object.name',
        optionsData$: productsPackage$.pipe(switchMap(productsPackage => this.productsStore.get(productsPackage.object.path))),
        getDependencies: () => {
          productsPackage$.pipe(
            map(productsPackage => {
              this.productsActions.getPaged(productsPackage.object.path, new PagedQuery());
            }),
            take(1)
          ).subscribe();
        },
        displayNameSelector: 'object.name',
        order: 1
      }),

      new Field({
        component: IntFieldComponent,
        value: entity ? entity.object.amount : undefined,
        key: 'amount',
      }),
      new Field({
        component: HiddenFieldComponent,
        value: entity ? entity.object.productId : this.invoiceId,
        key: 'invoiceId',
      }),
    ];

    return fields;
  }
}
