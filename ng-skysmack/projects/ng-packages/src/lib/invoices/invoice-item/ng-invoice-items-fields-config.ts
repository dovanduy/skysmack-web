import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';
import { InvoiceItem } from '@skysmack/packages-invoices';
import { Field } from '@skysmack/ng-ui';
import { FieldTypes } from '@skysmack/ng-ui';
import { NgInvoiceItemsValidation } from './ng-invoice-items-validation';
import { FieldsConfig } from '@skysmack/ng-ui';

export interface NgInvoiceItemFormDependencies {
    [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgInvoiceItemsFieldsConfig extends FieldsConfig<InvoiceItem, NgInvoiceItemFormDependencies> {
    public validation = new NgInvoiceItemsValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<InvoiceItem, number>, dependencies?: NgInvoiceItemFormDependencies): Field[] {
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
                fieldType: FieldTypes.int,
                value: entity ? entity.object.order : undefined,
                key: 'order',
                validators: [Validators.required],
                order: 2,
                showColumn: true
            } as Field),

            new Field({
                fieldType: FieldTypes.int,
                value: entity ? entity.object.units : undefined,
                key: 'units',
                validators: [Validators.required],
                order: 3,
                showColumn: true
            } as Field),

            new Field({
                fieldType: FieldTypes.int,
                value: entity ? entity.object.unitPrice : undefined,
                key: 'unitPrice',
                validators: [Validators.required],
                order: 4,
                showColumn: true
            } as Field),

            new Field({
                fieldType: FieldTypes.int,
                value: entity ? entity.object.unitDiscount : undefined,
                key: 'unitDiscount',
                validators: [Validators.required],
                order: 5,
                showColumn: true
            } as Field),

            new Field({
                fieldType: FieldTypes.int,
                value: entity ? entity.object.unitTax : undefined,
                key: 'unitTax',
                validators: [Validators.required],
                order: 6,
                showColumn: true
            } as Field),

            new Field({
                fieldType: FieldTypes.int,
                value: entity ? entity.object.inventoryId : undefined,
                key: 'inventoryId',
                validators: [Validators.required],
                order: 7,
                showColumn: true
            } as Field)
        ];

        // Id field must only be added for edit forms.
        // If added to a create form, it won't be able to bind in the backend.
        if (entity && entity.object.id) {
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
