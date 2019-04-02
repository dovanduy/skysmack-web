import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Invoice } from '@skysmack/packages-invoices';
import { Field } from '@skysmack/ng-ui';

import { FieldsConfig, StringFieldComponent, HiddenFieldComponent } from '@skysmack/portal-ui';
import { NgInvoicesValidation } from '@skysmack/ng-packages';

export interface NgInvoiceFormDependencies {
    [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgInvoicesFieldsConfig extends FieldsConfig<Invoice, number, NgInvoiceFormDependencies> {
    public validation = new NgInvoicesValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<Invoice, number>, dependencies?: NgInvoiceFormDependencies): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.currencyCode : undefined,
                key: 'currencyCode',
                validators: [Validators.required],
                order: 1,
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
