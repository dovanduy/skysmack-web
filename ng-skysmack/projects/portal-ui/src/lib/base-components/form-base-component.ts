import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from './base-component';
import { Field } from '../fields/field';
import { LocalObject, Record, toLocalObject, LocalObjectStatus, FieldSchemaViewModel } from '@skysmack/framework';
import { FieldsConfig } from '../fields/fields-config';
import { NgSkysmackStore } from 'lib/ng-packages/skysmack';
import { FieldTypes } from '../fields/field-types';
import { FormHelper } from '../forms/form-helper';
import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { EditorNavService } from '../components/common/container/editor-nav.service';

export class FormBaseComponent<TAppState, TRecord extends Record<TKey>, TKey, TDependencies> extends BaseComponent<TAppState, TKey> {
    /**
     * Fields being sent the dynamic form component used to create the form.
     */
    public fields: Field[];

    /**
     * The selected entity needed for edit forms.
     */
    public selectedEntity: LocalObject<TRecord, TKey>;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public editorNavService: EditorNavService,
        public actions: RecordActionsBase<TAppState, NgRedux<TAppState>>,
        public redux: NgSkysmackStore,
        public fieldsConfig: FieldsConfig<TRecord, TKey, TDependencies>,
    ) {
        super(router, activatedRoute, redux);
    }

    /**
     * Gets all fields needed to create a form. Combines standard and dynamic fields into one array.
     * @param entity Entity used for edit forms.
     * @param dynamicFields Any dynamic fields added to the package.
     * @param dependencies Any dependencies the form needs.
     */
    protected getFields(entity?: LocalObject<TRecord, TKey>, dynamicFields?: LocalObject<FieldSchemaViewModel,
        string>[], dependencies?: TDependencies): Field[] {
        const fields = this.fieldsConfig.getStaticFields(entity, dependencies);
        if (dynamicFields) {
            const returnfields = [
                ...fields,
                ...dynamicFields.map(dynamicField => {
                    return new Field({
                        fieldType: Number(FieldTypes[dynamicField.object.type]),
                        value: entity ? entity.object[dynamicField.object.key] : undefined,
                        key: dynamicField.object.key,
                        label: dynamicField.object.display,
                        placeholder: dynamicField.object.display,
                        order: 4,
                    } as Field);
                })
            ].sort((a, b) => a.order - b.order);

            return returnfields;
        } else {
            return fields.sort((a, b) => a.order - b.order);
        }
    }

    /**
     * Recieves a submitted form helper, formats the data, and either creates or updates an entity.
     * @param fh Form helper with submitted values.
     * @param entity Optional entity that will be updated with the values extraced from the form. Otherwise a new entity is created.
     */
    protected extractFormValues(fh: FormHelper, entity?: LocalObject<TRecord, TKey>): LocalObject<TRecord, TKey> {
        const formValues = fh.form.getRawValue();

        // Remove empty values
        Object.keys(formValues).forEach(key => {
            if (formValues[key] === 'undefined' || formValues[key] === undefined) {
                delete formValues[key];
            }
        });

        if (entity) {
            // Update existing entity
            entity.object = formValues;
            entity.status = LocalObjectStatus.MODIFYING;
            return entity;
        } else {
            // Create new entity
            return toLocalObject<TRecord, TKey>(
                formValues,
                undefined,
                LocalObjectStatus.CREATING,
                undefined,
                true
            );
        }
    }
}