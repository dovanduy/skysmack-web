import { Injectable } from '@angular/core';
import { LocalObject } from '@skysmack/framework';
import { AccessController, ACCESS_CONTROLLERS_AREA_KEY, ACCESS_CONTROLLERS_ADDITIONAL_PATHS, NgAccessControllersValidation } from '@skysmack/ng-axis-physical-access-control';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { StringFieldComponent, CheckboxFieldComponent, PasswordFieldComponent } from '@skysmack/portal-fields';
import { Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class NgAccessControllersFieldsConfig extends FieldsConfig<AccessController, string> {
    public validation = new NgAccessControllersValidation();
    public area = ACCESS_CONTROLLERS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
    ) {
        super(fieldProviders, ACCESS_CONTROLLERS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<AccessController, string>): Field[] {
        const fields: Field[] = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.route : undefined,
                validators: [Validators.required],
                key: 'route',
                order: 0,
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.username : undefined,
                validators: [Validators.required],
                key: 'username',
                order: 0,
            }),
            new Field({
                component: PasswordFieldComponent,
                value: entity ? entity.object.password : undefined,
                validators: [Validators.required],
                key: 'password',
                order: 0,
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: entity ? entity.object.skipVerifySSL : false,
                validators: [Validators.required],
                key: 'skipVerifySSL',
                order: 0,
            }),
        ];

        return fields;
    }
}
