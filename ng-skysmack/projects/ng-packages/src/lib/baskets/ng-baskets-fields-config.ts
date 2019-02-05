import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Basket } from '@skysmack/packages-baskets';
import { Field } from '@skysmack/ng-ui';
import { FieldTypes } from '@skysmack/ng-ui';
import { BasketsValidation } from './ng-baskets-validation';
import { FieldsConfig } from '@skysmack/ng-ui';

export interface NgBasketFormDependencies {
    [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgBasketsFieldsConfig extends FieldsConfig<Basket, NgBasketFormDependencies> {
    public validation = new BasketsValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<Basket, number>, dependencies?: NgBasketFormDependencies): Field[] {
        const fields = [
            new Field({
                fieldType: FieldTypes.string,
                value: entity ? entity.object.currencyCode : undefined,
                key: 'currencyCode',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            } as Field)
        ];

        // Id field must only be added for edit forms.
        // If added to a create form, it won't be able to bind in the backend.
        if (entity && entity.object.id && entity.status !== LocalObjectStatus.CREATING && entity.status !== LocalObjectStatus.ERROR) {
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
