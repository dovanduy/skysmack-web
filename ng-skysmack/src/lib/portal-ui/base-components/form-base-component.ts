import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from './base-component';
import { Field } from '../fields/field';
import { LocalObject, Record, toLocalObject, LocalObjectStatus, FieldSchemaViewModel } from '@skysmack/framework';
import { FieldsConfig } from '../fields/fields-config';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';
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
    public selectedEntity: LocalObject<TRecord>;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public editorNavService: EditorNavService,
        public actions: RecordActionsBase<TAppState, NgRedux<TAppState>>,
        public redux: NgSkysmackRedux,
        public fieldsConfig: FieldsConfig<TRecord, TDependencies>,
    ) {
        super(router, activatedRoute, actions, redux);
    }

    /**
     * Gets all fields needed to create a form. Combines standard and dynamic fields into one array.
     * @param entity Entity used for edit forms.
     * @param dynamicFields Any dynamic fields added to the package.
     * @param dependencies Any dependencies the form needs.
     */
    protected getFields(entity?: LocalObject<TRecord>, dynamicFields?: LocalObject<FieldSchemaViewModel>[], dependencies?: TDependencies): Field[] {
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
    protected extractFormValues(fh: FormHelper, entity?: LocalObject<TRecord>): LocalObject<TRecord> {
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
            return toLocalObject<TRecord>(
                formValues,
                undefined,
                LocalObjectStatus.CREATING,
                undefined,
                true
            );
        }
    }
}
