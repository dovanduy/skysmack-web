import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, Package } from '@skysmack/framework';
import { Field, CustomValidators, FormRule } from '@skysmack/ng-dynamic-forms';
import { NgPackagesStore, NgPackagesActions, PackagePathEditValidation } from '@skysmack/ng-packages';
import { FieldsConfig, StringFieldComponent } from '@skysmack/portal-ui';
import { FieldProviders } from '@skysmack/portal-ui';
import { LoadedPackage } from '@skysmack/ng-framework';
import { PACKAGES_AREA_KEY } from '@skysmack/packages-skysmack-core';

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
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, _package?: LocalObject<Package, string>): Field[] {
        return [
            new Field({
                component: StringFieldComponent,
                value: _package ? _package.object.path : undefined,
                key: 'currentPath',
                disabled: true,
                order: 1
            }),
            new Field({
                component: StringFieldComponent,
                value: _package ? _package.object.path : undefined,
                key: 'newPath',
                validators: [Validators.required, CustomValidators.minStringLength(3)],
                order: 2
            })
        ];
    }
}
