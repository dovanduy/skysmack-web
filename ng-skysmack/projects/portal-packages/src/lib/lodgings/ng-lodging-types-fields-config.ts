import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, Field, FieldTypes } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { LodgingType } from '@skysmack/packages-lodgings';
import { NgLodgingTypesValidation } from '@skysmack/ng-packages';
import { FieldsConfig } from '@skysmack/portal-ui';

export interface NgLodgingTypeFormDependencies {
    [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesFieldsConfig extends FieldsConfig<LodgingType, number, NgLodgingTypeFormDependencies> {
    public validation = new NgLodgingTypesValidation();

    public formRules: FormRule[] = [
    ];

    protected getEntityFields(entity?: LocalObject<LodgingType, number>, dependencies?: NgLodgingTypeFormDependencies): Field[] {
        const fields = [
            new Field({
                fieldType: FieldTypes.string,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            })

        ];

        // Id field must only be added for edit forms.
        // If added to a create form, it won't be able to bind in the backend.
        if (entity && entity.object.id && entity.status !== LocalObjectStatus.CREATING) {
            fields.push(new Field({
                fieldType: FieldTypes.HiddenField,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            }));
        }

        return fields;
    }
}
