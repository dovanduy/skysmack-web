import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, Package } from '@skysmack/framework';
import { FormRule, Field, CustomValidators, SetPathRule, SelectField } from '@skysmack/ng-ui';
import { PackagesValidation, LoadedPackage, NgPackagesStore } from '@skysmack/ng-packages';
import { FieldsConfig, StringFieldComponent, SelectFieldComponent, HiddenFieldComponent, PackageDependenciesFieldComponent } from '@skysmack/portal-ui';
import { FieldProviders } from '@skysmack/portal-ui';

@Injectable({ providedIn: 'root' })
export class NgPackagesFieldsConfig extends FieldsConfig<Package, string> {
    public validation = new PackagesValidation();

    public formRules: FormRule[] = [
        new SetPathRule(['name'])
    ];

    constructor(
        public store: NgPackagesStore,
        public fieldProviders: FieldProviders
    ) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, _package?: LocalObject<Package, string>): Field[] {
        return [
            new SelectField({
                component: SelectFieldComponent,
                value: _package ? _package.object.type : undefined,
                label: 'Type',
                key: 'type',
                validators: [Validators.required],
                optionsData$: this.store.getAvailablePackages(),
                valueSelector: 'object.type',
                displayNameSelector: 'object.name',
                disabled: _package ? true : false,
                order: 1
            }),

            new Field({
                component: PackageDependenciesFieldComponent,
                value: _package ? _package.object.name : undefined,
                key: 'dependencies',
                order: 2,
            }),

            new Field({
                component: StringFieldComponent,
                value: _package ? _package.object.name : undefined,
                key: 'name',
                label: 'Name',
                validators: [Validators.required],
                order: 2,
                placeholder: 'Enter name',
                showColumn: true
            }),

            new Field({
                component: StringFieldComponent,
                value: _package ? _package.object.description : undefined,
                key: 'description',
                label: 'Description',
                order: 3,
                placeholder: 'Enter description'
            }),

            new Field({
                component: StringFieldComponent,
                value: _package ? _package.object.path : undefined,
                key: 'path',
                label: 'path',
                validators: [Validators.required, CustomValidators.minStringLength(3)],
                order: 4,
                placeholder: 'Enter path',
                showColumn: true
            }),

            new Field({
                component: HiddenFieldComponent,
                value: _package ? _package.object.dependencies : undefined,
                key: 'dependencies',
                label: 'dependencies',
                order: 4,
            })
        ];
    }
}
