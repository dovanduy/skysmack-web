import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { InvoicePayment } from '@skysmack/packages-invoices';
import { Field } from '@skysmack/ng-ui';

import { FieldsConfig, StringFieldComponent, HiddenFieldComponent, IntFieldComponent } from '@skysmack/portal-ui';
import { NgInvoicePaymentsValidation, LoadedPackage } from '@skysmack/ng-packages';

@Injectable({ providedIn: 'root' })
export class NgInvoicePaymentsFieldsConfig extends FieldsConfig<InvoicePayment, number> {
    public validation = new NgInvoicePaymentsValidation();

    public formRules: FormRule[] = [];

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
