import { Injectable } from '@angular/core';
import { FormRule } from 'lib/portal-ui/forms/form-rule';
import { LocalObject, Package } from '@skysmack/framework';
import { Field } from 'lib/portal-ui/fields/field';
import { PackagesValidation } from './ng-packages-validation';
import { SetUrlRule } from 'lib/portal-ui/forms/rules/set-url-rule';
import { SelectField } from 'lib/portal-ui/fields/select-field';
import { FieldTypes } from 'lib/portal-ui/fields/field-types';
import { Validators } from '@angular/forms';

export interface NgPackageFormDependencies {
    availablePackages: LocalObject<Package>[];
}

@Injectable({ providedIn: 'root' })
export class NgPackagesFieldsConfig {
    public validation = new PackagesValidation();

    public formRules: FormRule[] = [
        new SetUrlRule(['name'])
    ];

    protected getEntityFields(_package?: LocalObject<Package>, dependencies?: NgPackageFormDependencies): Field[] {
        return [
            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: _package ? _package.object.type : undefined,
                label: 'Type',
                key: 'type',
                validators: [Validators.required],
                optionsData: dependencies.availablePackages,
                valueSelector: 'type',
                displayNameSelector: 'name',
                disabled: _package ? true : false,
                order: 1,
            } as SelectField),

            new SelectField({
                fieldType: FieldTypes.string,
                value: _package ? _package.object.name : undefined,
                key: 'name',
                label: 'Name',
                validators: [Validators.required],
                order: 2,
                placeholder: 'Enter name'
            } as SelectField),

            new Field({
                fieldType: FieldTypes.string,
                value: _package ? _package.object.description : undefined,
                key: 'description',
                label: 'Description',
                order: 3,
                placeholder: 'Enter description'
            } as Field),

            new Field({
                fieldType: FieldTypes.string,
                value: _package ? _package.object.path : undefined,
                key: 'path',
                label: 'path',
                validators: [Validators.required],
                order: 4,
                placeholder: 'Enter path'
            } as Field)
        ];
    }
}
