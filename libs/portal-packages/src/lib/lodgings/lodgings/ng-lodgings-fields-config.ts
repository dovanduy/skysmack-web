import { Lodging } from '@skysmack/packages-lodgings';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { FieldsConfig, FieldProviders, SelectFieldComponent, CheckboxFieldComponent, StringFieldComponent, HiddenFieldComponent } from '@skysmack/portal-ui';
import { NgLodgingsValidation, NgLodgingTypesStore, NgLodgingTypesActions } from '@skysmack/ng-packages';
import { LoadedPackage } from '@skysmack/ng-redux';
import { FormRule, Field, SelectField } from '@skysmack/ng-ui';

@Injectable({ providedIn: 'root' })
export class NgLodgingsFieldsConfig extends FieldsConfig<Lodging, number> {
    public validation = new NgLodgingsValidation();

    public formRules: FormRule[] = [];

    constructor(
        public lodgingTypeStore: NgLodgingTypesStore,
        public fieldProvideres: FieldProviders,
        public lodgingTypesActions: NgLodgingTypesActions
    ) {
        super(fieldProvideres);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<Lodging, number>): Field[] {
        const fields = [
            new SelectField({
                component: SelectFieldComponent,
                value: entity && entity.object ? entity.object.lodgingTypeId : undefined,
                label: 'Lodging type',
                key: 'lodgingTypeId',
                displayKey: 'lodgingTypes',
                displaySubKey: 'object.description',
                validators: [Validators.required],
                optionsData$: this.lodgingTypeStore.get(loadedPackage._package.path),
                getDependencies: () => { this.lodgingTypesActions.getPaged(loadedPackage._package.path, new PagedQuery()); },
                displayNameSelector: 'name',
                disabled: entity && entity.object ? true : false,
                order: 1,
            }),

            new Field({
                component: CheckboxFieldComponent,
                value: entity && entity.object ? entity.object.disabled : false,
                label: 'Enabled',
                key: 'disabled',
                validators: [Validators.required],
                order: 2,
                showColumn: true
            }),

            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 3,
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
