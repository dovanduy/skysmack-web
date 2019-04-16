import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { InvoiceItem } from '@skysmack/packages-invoices';
import { Field } from '@skysmack/ng-ui';

import { DocumentFieldsConfig, StringFieldComponent, HiddenFieldComponent, IntFieldComponent } from '@skysmack/portal-ui';
import { NgInvoiceItemsValidation } from '@skysmack/ng-packages';
import { NgFieldStore, LoadedPackage } from '@skysmack/ng-redux';
import { FieldProviders } from '@skysmack/portal-ui';

@Injectable({ providedIn: 'root' })
export class NgInvoiceItemsFieldsConfig extends DocumentFieldsConfig<InvoiceItem, number> {
    public validation = new NgInvoiceItemsValidation();

    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        public fieldsStore: NgFieldStore
    ) {
        super(fieldProviders, fieldsStore);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<InvoiceItem, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.description : undefined,
                key: 'description',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),

            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.order : undefined,
                key: 'order',
                validators: [Validators.required],
                order: 2,
                showColumn: true
            }),

            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.units : undefined,
                key: 'units',
                validators: [Validators.required],
                order: 3,
                showColumn: true
            }),

            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.unitPrice : undefined,
                key: 'unitPrice',
                validators: [Validators.required],
                order: 4,
                showColumn: true
            }),

            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.unitDiscount : undefined,
                key: 'unitDiscount',
                validators: [Validators.required],
                order: 5,
                showColumn: true
            }),

            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.unitTax : undefined,
                key: 'unitTax',
                validators: [Validators.required],
                order: 6,
                showColumn: true
            }),

            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.inventoryId : undefined,
                key: 'inventoryId',
                validators: [Validators.required],
                order: 7,
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
