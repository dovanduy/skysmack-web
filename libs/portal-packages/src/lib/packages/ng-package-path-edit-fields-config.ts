import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, Package } from '@skysmack/framework';
import { Field, CustomValidators, FormRule } from '@skysmack/ng-dynamic-forms';
import { NgPackagesStore, NgPackagesActions, PackagePathEditValidation } from '@skysmack/ng-packages';
import { LoadedPackage } from '@skysmack/ng-framework';
import { PACKAGES_AREA_KEY, PACKAGES_ADDITIONAL_PATHS } from '@skysmack/packages-skysmack-core';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { StringFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgPackagePathEditFieldsConfig extends FieldsConfig<Package, string> {
    public validation = new PackagePathEditValidation();
    public area = PACKAGES_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public store: NgPackagesStore,
        public actions: NgPackagesActions,
        public fieldProviders: FieldProviders
    ) {
        super(fieldProviders, PACKAGES_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, _package?: LocalObject<Package, string>): Field[] {
        return [
            new Field({
                component: StringFieldComponent,
                value: _package ? _package.object.path : undefined,
                key: 'previousPath',
                disabled: true,
                order: 1,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: _package ? _package.object.path : undefined,
                key: 'newPath',
                validators: [Validators.required, CustomValidators.minStringLength(3)],
                order: 2,
                sortable: true
            })
        ];
    }
}
