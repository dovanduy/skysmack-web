import { Injectable } from '@angular/core';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject, Package, AvailablePackage } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';
import { PackagesValidation } from './ng-packages-validation';
import { SetPathRule } from '@skysmack/ng-ui';
import { SelectField } from '@skysmack/ng-ui';
import { FieldTypes } from '@skysmack/ng-ui';
import { Validators } from '@angular/forms';

export interface NgPackageFormDependencies {
    availablePackages: LocalObject<AvailablePackage, string>[];
}

@Injectable({ providedIn: 'root' })
export class NgPackagesFieldsConfig {
    public validation = new PackagesValidation();

    public formRules: FormRule[] = [
        new SetPathRule(['name'])
    ];

    public getStaticFields(entity?: LocalObject<Package, string>, dependencies?: NgPackageFormDependencies): Field[] {
        const fieldArea = this.validation.area.toUpperCase() + '.FORM.';
        return this.getEntityFields(entity, dependencies).map(field => {
            // Labels
            field.label = fieldArea + 'LABELS.' + field.key.toUpperCase();
            // Placeholders
            field.placeholder = fieldArea + 'PLACEHOLDERS.' + field.key.toUpperCase();
            return field;
        });
    }

    protected getEntityFields(_package?: LocalObject<Package, string>, dependencies?: NgPackageFormDependencies): Field[] {
        return [
            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: _package ? _package.object.type : undefined,
                label: 'Type',
                key: 'type',
                validators: [Validators.required],
                optionsData: dependencies.availablePackages,
                valueSelector: 'object.type',
                displayNameSelector: 'object.name',
                disabled: _package ? true : false,
                order: 1,
            } as SelectField),

            new Field({
                fieldType: FieldTypes.PackageDependenciesField,
                value: _package ? _package.object.name : undefined,
                key: 'name',
                label: 'Name',
                validators: [Validators.required],
                order: 2,
                placeholder: 'Enter name'
            } as Field),

            new Field({
                fieldType: FieldTypes.string,
                value: _package ? _package.object.name : undefined,
                key: 'name',
                label: 'Name',
                validators: [Validators.required],
                order: 2,
                placeholder: 'Enter name'
            } as Field),

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
            } as Field),

            new Field({
                fieldType: FieldTypes.HiddenField,
                value: _package ? _package.object.dependencies : undefined,
                key: 'dependencies',
                label: 'dependencies',
                order: 4,
            } as Field)
        ];
    }
}
