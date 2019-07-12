import { Injectable } from '@angular/core';
import { LocalObject, PagedQuery } from '@skysmack/framework';

import { NgInvoicesProductsValidation, NgProductsActions, NgProductsStore } from '@skysmack/ng-packages';
import { LoadedPackage, getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { INVOICES_PRODUCTS_AREA_KEY } from '@skysmack/packages-invoices-products';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map, take, switchMap } from 'rxjs/operators';
import { Validators } from '@angular/forms';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { SelectFieldComponent, IntFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';

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
        getDependencies: () => { productsPackage$.pipe(map(productsPackage => { this.productsActions.getPaged(productsPackage.object.path, new PagedQuery());
            }),
            take(1)
          ).subscribe();
        },
        displayNameSelector: 'object.name',
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
        value: entity ? entity.object.productId : this.invoiceId,
        key: 'invoiceId',
      }),
    ];

    return fields;
  }
}
