import { Injectable } from '@angular/core';
import { FormRule, SelectField } from '@skysmack/ng-ui';
import { LocalObject, PagedQuery } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';

import { FieldsConfig, FieldProviders, SelectFieldComponent, IntFieldComponent } from '@skysmack/portal-ui';
import { NgInvoicesProductsValidation, NgInvoicesActions, NgInvoicesStore } from '@skysmack/ng-packages';
import { LoadedPackage, getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { INVOICES_PRODUCTS_AREA_KEY } from '@skysmack/packages-invoices-products';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { map, take, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgInvoicesProductsFieldsConfig extends FieldsConfig<any, unknown> {
  public validation = new NgInvoicesProductsValidation();
  public area = INVOICES_PRODUCTS_AREA_KEY;
  public formRules: FormRule[] = [];

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
      // Add invoice select field. Remember to select invoices from the correct package.
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
        order: 1
      }),

      new Field({
        component: IntFieldComponent,
        value: entity ? entity.object.amount : undefined,
        key: 'amount',

      }),
    ];

    return fields;
  }
}
