import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { LodgingType } from '@skysmack/packages-lodgings';
import { FieldProviders, DocumentFieldsConfig, StringFieldComponent, HiddenFieldComponent } from '@skysmack/portal-ui';
import { NgLodgingTypesValidation } from '@skysmack/ng-packages';
import { FormRule, Field } from '@skysmack/ng-ui';
import { NgFieldStore, LoadedPackage } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesFieldsConfig extends DocumentFieldsConfig<LodgingType, number> {
    public validation = new NgLodgingTypesValidation();

    public formRules: FormRule[] = [
    ];

    constructor(
        public fieldProviders: FieldProviders,
        public fieldsStore: NgFieldStore
    ) {
        super(fieldProviders, fieldsStore);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<LodgingType, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
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
                component: HiddenFieldComponent,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            }));
        }

        return fields;
    }
}
