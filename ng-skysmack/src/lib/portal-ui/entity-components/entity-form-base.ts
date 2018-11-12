import { FormHelper } from 'framework/forms/form-helper';
import { LocalObject } from 'framework/models/local-object';
import { toLocalObject } from 'framework/helpers/framework.helpers';
import { LocalObjectStatus } from 'framework/models/local-object-status';
import { Field } from 'framework/fields/field';
import { FieldTypes } from 'framework/fields/field-types';
import { FormGroup } from '@angular/forms';
import { FieldSchemaViewModel } from 'skysmack-api';
import { EntityBase } from 'framework/entity-components/entity-base';
import { Router, ActivatedRoute } from '@angular/router';
import { FieldsConfig } from 'framework/models/fields-config';
import { BaseRedux } from 'framework/redux';

export class EntityFormBase extends EntityBase {
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
        public redux: BaseRedux,
        public fieldsConfig: FieldsConfig,
    ) {
        super(router, activatedRoute, redux);
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
            );
        }
    }
}
