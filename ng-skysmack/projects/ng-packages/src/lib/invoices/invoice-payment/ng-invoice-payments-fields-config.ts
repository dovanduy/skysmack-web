import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { InvoicePayment } from '@skysmack/packages-invoices';
import { Field } from '@skysmack/ng-ui';
import { FieldTypes } from '@skysmack/ng-ui';
import { NgInvoicePaymentsValidation } from './ng-invoice-payments-validation';
import { FieldsConfig } from '@skysmack/ng-ui';

export interface NgInvoicePaymentFormDependencies {
    [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgInvoicePaymentsFieldsConfig extends FieldsConfig<InvoicePayment, number, NgInvoicePaymentFormDependencies> {
    public validation = new NgInvoicePaymentsValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<InvoicePayment, number>, dependencies?: NgInvoicePaymentFormDependencies): Field[] {
        const fields = [
            new Field({
                fieldType: FieldTypes.string,
                value: entity ? entity.object.description : undefined,
                key: 'description',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            } as Field),

            new Field({
                fieldType: FieldTypes.string,
                value: entity ? entity.object.source : undefined,
                key: 'source',
                validators: [Validators.required],
                order: 2,
                showColumn: true
            } as Field),

            new Field({
                fieldType: FieldTypes.int,
                value: entity ? entity.object.amount : undefined,
                key: 'amount',
                validators: [Validators.required],
                order: 3,
                showColumn: true
            } as Field),

            new Field({
                fieldType: FieldTypes.string,
                value: entity ? entity.object.ip : undefined,
                key: 'ip',
                validators: [Validators.required],
                order: 4,
                showColumn: true
            } as Field),

            new Field({
                fieldType: FieldTypes.int,
                value: entity ? entity.object.inventoryId : undefined,
                key: 'inventoryId',
                validators: [Validators.required],
                order: 5,
                showColumn: true
            } as Field)
        ];

        // Id field must only be added for edit forms.
        // If added to a create form, it won't be able to bind in the backend.
        if (entity && entity.object.id && entity.status !== LocalObjectStatus.CREATING) {
            fields.push(new Field({
                fieldType: FieldTypes.HiddenField,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            } as Field));
        }

        return fields;
    }
}
