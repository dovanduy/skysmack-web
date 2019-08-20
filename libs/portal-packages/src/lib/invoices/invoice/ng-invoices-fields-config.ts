import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Invoice, INVOICES_AREA_KEY, INVOICES_ADDITIONAL_PATHS } from '@skysmack/packages-invoices';

import { NgInvoicesValidation } from '@skysmack/ng-invoices';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { StringFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';

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
    super(fieldProviders, INVOICES_ADDITIONAL_PATHS);
  }

  protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<Invoice, number>): Field[] {
    const fields = [
      new Field({
        component: StringFieldComponent,
        value: entity ? entity.object.description : undefined,
        key: 'description',
        order: 1,
        showColumn: true,
        sortable: true
      }),
      new Field({
        component: StringFieldComponent,
        value: entity ? entity.object.currencyCode : undefined,
        key: 'currencyCode',
        validators: [Validators.required],
        order: 2,
        showColumn: true,
        sortable: true
      }),
      new Field({
        value: entity ? entity.object.total : undefined,
        key: 'total',
        includeInForm: false,
        showColumn: true,
        sortable: true
      }),
      new Field({
        value: entity ? entity.object.totalTax : undefined,
        key: 'totalTax',
        includeInForm: false,
        showColumn: true,
        sortable: true
      }),
      new Field({
        value: entity ? entity.object.balance : undefined,
        key: 'balance',
        includeInForm: false,
        showColumn: true,
        sortable: true
      }),
      new Field({
        value: entity ? entity.object.paid : undefined,
        key: 'paid',
        includeInForm: false,
        showColumn: true,
        sortable: true
      }),
      new Field({
        value: entity ? entity.object.status : undefined,
        key: 'status',
        includeInForm: false,
        showColumn: true,
        sortable: true
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
