import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject } from '@skysmack/framework';
import { Field, FormRule, CustomValidators } from '@skysmack/ng-ui';
import { User } from '@skysmack/packages-identities';
import { NgSetPasswordValidation, LoadedPackage } from '@skysmack/ng-packages';
import { FieldsConfig, PasswordFieldComponent } from '@skysmack/portal-ui';

@Injectable({ providedIn: 'root' })
export class NgSetPasswordFieldsConfig extends FieldsConfig<User, number> {
    public validation = new NgSetPasswordValidation();
    public formRules: FormRule[] = [];

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
            }),

            new Field({
                component: PasswordFieldComponent,
                value: undefined,
                key: 'confirmPassword',
                label: 'Confirm password',
                validators: [Validators.required],
                order: 3,
                placeholder: 'Password',
            })
        ];

        return fields;
    }
}
