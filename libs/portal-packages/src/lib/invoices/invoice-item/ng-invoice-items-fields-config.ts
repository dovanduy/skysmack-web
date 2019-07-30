import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { InvoiceItem, INVOICE_ITEMS_AREA_KEY } from '@skysmack/packages-invoices';

import { NgInvoiceItemsValidation } from '@skysmack/ng-invoices';
import { NgFieldStore, LoadedPackage } from '@skysmack/ng-framework';
import { Router } from '@angular/router';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { DocumentFieldsConfig, StringFieldComponent, IntFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { FieldProviders } from '@skysmack/ng-fields';

@Injectable({ providedIn: 'root' })
export class NgInvoiceItemsFieldsConfig extends DocumentFieldsConfig<InvoiceItem, number> {
    public validation = new NgInvoiceItemsValidation();
    public area = INVOICE_ITEMS_AREA_KEY;
    public formRules: FormRule[] = [];

    public inventoryId: number;

    constructor(
        public fieldProviders: FieldProviders,
        public fieldsStore: NgFieldStore,
        public router: Router
    ) {
        super(fieldProviders, fieldsStore, router);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<InvoiceItem, number>): Field[] {

        let inventoryId = entity ? entity.object.inventoryId : undefined
        inventoryId = inventoryId ? inventoryId : this.inventoryId;

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
                component: HiddenFieldComponent,
                value: inventoryId,
                key: 'inventoryId',
                validators: [Validators.required],
                order: 7
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
