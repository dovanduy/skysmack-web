import { Lodging, LODGINGS_AREA_KEY, LODGINGS_ADDITIONAL_PATHS } from '@skysmack/packages-lodgings';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { NgLodgingsValidation, NgLodgingTypesStore, NgLodgingTypesActions } from '@skysmack/ng-lodgings';
import { LoadedPackage, NgFieldStore } from '@skysmack/ng-framework';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { DocumentFieldsConfig, StringFieldComponent, SelectFieldComponent, CheckboxFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { FieldProviders } from '@skysmack/ng-fields';

@Injectable({ providedIn: 'root' })
export class NgLodgingsFieldsConfig extends DocumentFieldsConfig<Lodging, number> {
    public validation = new NgLodgingsValidation();
    public area = LODGINGS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProvideres: FieldProviders,
        public fieldStore: NgFieldStore,
        public lodgingTypeStore: NgLodgingTypesStore,
        public lodgingTypesActions: NgLodgingTypesActions,
    ) {
        super(fieldProvideres, fieldStore, LODGINGS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<Lodging, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            }),
            new SelectField({
                component: SelectFieldComponent,
                value: entity && entity.object ? entity.object.lodgingTypeId : undefined,
                key: 'lodgingTypeId',
                displayKey: 'lodgingType',
                displaySubKey: 'object.name',
                validators: [Validators.required],
                optionsData$: this.lodgingTypeStore.get(loadedPackage._package.path),
                getDependencies: () => { this.lodgingTypesActions.getPaged(loadedPackage._package.path, new PagedQuery()); },
                disabled: entity && entity.object ? true : false,
                order: 2,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: entity && entity.object ? entity.object.disabled : false,
                label: 'Enabled',
                key: 'disabled',
                validators: [Validators.required],
                order: 3,
                showColumn: true,
                sortable: true
            }),
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
