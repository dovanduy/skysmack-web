import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { InvoicePayment, INVOICE_PAYMENTS_AREA_KEY } from '@skysmack/packages-invoices';

import { NgInvoicePaymentsValidation } from '@skysmack/ng-invoices';
import { NgFieldStore, LoadedPackage } from '@skysmack/ng-framework';
import { Router } from '@angular/router';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { DocumentFieldsConfig, StringFieldComponent, IntFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { FieldProviders } from '@skysmack/ng-fields';

@Injectable({ providedIn: 'root' })
export class NgInvoicePaymentsFieldsConfig extends DocumentFieldsConfig<InvoicePayment, number> {
    public validation = new NgInvoicePaymentsValidation();
    public area = INVOICE_PAYMENTS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        public fieldsStore: NgFieldStore,
        public router: Router
    ) {
        super(fieldProviders, fieldsStore, router);
    }


    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<InvoicePayment, number>): Field[] {
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
                component: StringFieldComponent,
                value: entity ? entity.object.source : undefined,
                key: 'source',
                validators: [Validators.required],
                order: 2,
                showColumn: true
            }),

            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.amount : undefined,
                key: 'amount',
                validators: [Validators.required],
                order: 3,
                showColumn: true
            }),

            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.ip : undefined,
                key: 'ip',
                validators: [Validators.required],
                order: 4,
                showColumn: true
            }),

            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.inventoryId : undefined,
                key: 'inventoryId',
                validators: [Validators.required],
                order: 5,
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
