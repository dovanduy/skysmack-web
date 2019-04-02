import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Basket } from '@skysmack/packages-baskets';
import { Field } from '@skysmack/ng-ui';

import { BasketsValidation } from '@skysmack/ng-packages';
import { FieldsConfig, StringFieldComponent, HiddenFieldComponent } from '@skysmack/portal-ui';

export interface NgBasketFormDependencies {
    [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgBasketsFieldsConfig extends FieldsConfig<Basket, number, NgBasketFormDependencies> {
    public validation = new BasketsValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<Basket, number>, dependencies?: NgBasketFormDependencies): Field[] {
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
