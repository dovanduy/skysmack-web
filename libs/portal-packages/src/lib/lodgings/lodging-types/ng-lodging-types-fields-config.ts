import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { LodgingType, LODGING_TYPES_AREA_KEY, LODGING_TYPES_ADDITIONAL_PATHS } from '@skysmack/packages-lodgings';
import { NgLodgingTypesValidation } from '@skysmack/ng-lodgings';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { NgFieldStore, LoadedPackage } from '@skysmack/ng-framework';
import { DocumentFieldsConfig, StringFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { FieldProviders } from '@skysmack/ng-fields';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesFieldsConfig extends DocumentFieldsConfig<LodgingType, number> {
    public validation = new NgLodgingTypesValidation();
    public area = LODGING_TYPES_AREA_KEY;
    public formRules: FormRule[] = [
    ];

    constructor(
        public fieldProviders: FieldProviders,
        public fieldsStore: NgFieldStore
    ) {
        super(fieldProviders, fieldsStore, LODGING_TYPES_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<LodgingType, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
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
