import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Invoice, INVOICES_AREA_KEY } from '@skysmack/packages-invoices';
import { Field } from '@skysmack/ng-ui';

import { FieldsConfig, StringFieldComponent, HiddenFieldComponent, FieldProviders } from '@skysmack/portal-ui';
import { NgInvoicesValidation } from '@skysmack/ng-packages';
import { LoadedPackage } from '@skysmack/ng-redux';

export interface NgInvoiceFormDependencies {
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgInvoicesFieldsConfig extends FieldsConfig<Invoice, number> {
  public validation = new NgInvoicesValidation();
  public area = INVOICES_AREA_KEY;
  public formRules: FormRule[] = [];

  constructor(
    public fieldProviders: FieldProviders
  ) {
    super(fieldProviders);
  }

  protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<Invoice, number>): Field[] {
    const fields = [
      new Field({
        component: StringFieldComponent,
        value: entity ? entity.object.currencyCode : undefined,
        key: 'currencyCode',
        validators: [Validators.required],
        order: 1,
        showColumn: true
      }),
      new Field({
        value: entity ? entity.object.total : undefined,
        key: 'total',
        includeInForm: false,
        showColumn: true
      }),
      new Field({
        value: entity ? entity.object.totalTax : undefined,
        key: 'totalTax',
        includeInForm: false,
        showColumn: true
      }),
      new Field({
        value: entity ? entity.object.balance : undefined,
        key: 'balance',
        includeInForm: false,
        showColumn: true
      }),
      new Field({
        value: entity ? entity.object.paid : undefined,
        key: 'paid',
        includeInForm: false,
        showColumn: true
      }),
      new Field({
        value: entity ? entity.object.status : undefined,
        key: 'status',
        includeInForm: false,
        showColumn: true
      })
    ];

    // Id field must only be added for edit forms.
    // If added to a create form, it won't be able to bind in the backend.
    if (entity && entity.object.id && entity.status !== LocalObjectStatus.CREATING) {
      fields.push(new Field({
        component: HiddenFieldComponent,
        value: entity ? entity.object.id : undefined,
        key: 'id',
        order: 0,
      }));
    }

    return fields;
  }
}
