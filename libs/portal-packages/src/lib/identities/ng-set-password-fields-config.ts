import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject } from '@skysmack/framework';
import { Field, FormRule, CustomValidators } from '@skysmack/ng-dynamic-forms';
import { User, IDENTITES_AREA_KEY, IDENTITES_ADDITIONAL_PATHS } from '@skysmack/packages-identities';
import { LoadedPackage } from '@skysmack/ng-framework';
import { NgSetPasswordValidation } from '@skysmack/ng-identities';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { PasswordFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgSetPasswordFieldsConfig extends FieldsConfig<User, number> {
    public validation = new NgSetPasswordValidation();
    public area = IDENTITES_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, IDENTITES_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<User, number>): Field[] {
        const fields = [
            new Field({
                component: PasswordFieldComponent,
                value: undefined,
                key: 'password',
                label: 'Password',
                validators: [Validators.required, CustomValidators.validPassword()],
                order: 2,
                placeholder: 'Password',
                sortable: true
            }),

            new Field({
                component: PasswordFieldComponent,
                value: undefined,
                key: 'confirmPassword',
                label: 'Confirm password',
                validators: [Validators.required],
                order: 3,
                placeholder: 'Password',
                sortable: true
            }),

            new Field({
                component: HiddenFieldComponent,
                value: entity ? entity.object.id : undefined,
                key: 'id'
            }),
        ];

        return fields;
    }
}
