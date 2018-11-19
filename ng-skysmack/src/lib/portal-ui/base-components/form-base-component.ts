import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from './base-component';
import { Field } from '../fields/field';
import { LocalObject, Record, toLocalObject, LocalObjectStatus } from '@skysmack/framework';
import { FieldsConfig } from '../fields/fields-config';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { FieldSchemaViewModel } from '../fields/field-schema-view-model';
import { FieldTypes } from '../fields/field-types';
import { FormHelper } from '../forms/form-helper';
import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { EditorNavService } from '../components/common/container/editor-nav.service';

export class FormBaseComponent<TAppState, TRecord extends Record<TKey>, TKey> extends BaseComponent<TAppState, TKey> {
    /**
     * Fields being sent the dynamic form component used to create the form.
     */
    public fields: Field[];

    /**
     * The selected entity needed for edit forms.
     */
    public selectedEntity: LocalObject<any>;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public editorNavService: EditorNavService,
        public actions: RecordActionsBase<TAppState, NgRedux<TAppState>>,
        public redux: NgSkysmackRedux,
        public fieldsConfig: FieldsConfig<TRecord>,
    ) {
        super(router, activatedRoute, actions, redux);
    }


    /**
     * Gets all fields needed to create a form. Combines standard and dynamic fields into one array.
     * @param entity Entity used for edit forms.
     * @param dynamicFields Any dynamic fields added to the package.
     * @param dependencies Any dependencies the form needs.
     */
    protected getFields(entity?: LocalObject<any>, dynamicFields?: LocalObject<FieldSchemaViewModel>[], dependencies?: any): Field[] {
        const fields = this.fieldsConfig.getStaticFields(entity, dependencies);
        if (dynamicFields) {
            return [
                ...fields,
                ...dynamicFields.map(dynamicField => {
                    return new Field({
                        fieldType: Number(FieldTypes[dynamicField.object.type]),
                        value: entity ? entity.object[dynamicField.object.key] : undefined,
                        key: dynamicField.object.key,
                        label: dynamicField.object.display,
                        placeholder: dynamicField.object.display,
                        order: 4,
                        groupName: 'fields'
                    } as Field);
                })
            ].sort((a, b) => a.order - b.order);
        } else {
            return fields.sort((a, b) => a.order - b.order);
        }
    }

    /**
     * Runs the form helpers validation logic against the submitted form. Runs the supplied logic on success.
     * @param formHelper Form helper with validation logic and the submitted form.
     * @param onValidated What to do if the form validates.
     */
    protected validateForm(formHelper: FormHelper, onValidated: Function, autoReset: boolean = true) {
        formHelper.formSubmitted = true;
        if (!formHelper.form.valid) {
            formHelper.validateForm(formHelper.form);
        } else {
            formHelper.formSubmitted = false;
            onValidated();
            if (autoReset) {
                (formHelper.form as FormGroup).reset();
                formHelper.autoReset = autoReset;
            }
        }
    }

    /**
     * Recieves a submitted form helper, formats the data, and either creates or updates an entity.
     * @param fh Form helper with submitted values.
     * @param entity Optional entity that will be updated with the values extraced from the form. Otherwise a new entity is created.
     */
    protected extractFormValues(fh: FormHelper, entity?: LocalObject<any>): LocalObject<any> {
        let extractedValues;
        const formValues: { default, fields } = fh.form.getRawValue();

        if (formValues.fields) {
            extractedValues = {
                ...formValues.default,
                ...formValues.fields
            };
        } else {
            // The form has no custom fields. Only extract default fields
            extractedValues = {
                ...formValues.default,
            };
        }

        // Remove empty values
        Object.keys(extractedValues).forEach(key => {
            if (extractedValues[key] === 'null' || extractedValues[key] === null) {
                extractedValues[key] = undefined;
            }
        });

        if (entity) {
            // Update existing entity
            entity.object = extractedValues;
            return entity;
        } else {
            // Create new entity
            return toLocalObject<any>(
                extractedValues,
                undefined,
                LocalObjectStatus.CREATING,
                undefined,
                true
            );
        }
    }
}
