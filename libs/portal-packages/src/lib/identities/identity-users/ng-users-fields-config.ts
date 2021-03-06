import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, CustomValidators, Field } from '@skysmack/ng-dynamic-forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { User, USERS_AREA_KEY, USERS_ADDITIONAL_PATHS } from '@skysmack/packages-identities';
import { NgUsersValidation } from '@skysmack/ng-identities';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { EmailFieldComponent, PasswordFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgUsersFieldsConfig extends FieldsConfig<User, number> {
    public validation = new NgUsersValidation();
    public area = USERS_AREA_KEY;
    public formRules: FormRule[] = [];

    public mode: 'create' | 'edit' = 'create';

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, USERS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<User, number>): Field[] {
        const fields = [
            new Field({
                component: EmailFieldComponent,
                value: entity ? entity.object.email : undefined,
                key: 'email',
                validators: [Validators.required, CustomValidators.validEmail()],
                order: 1,
                showColumn: true,
                sortable: true
            })
        ];

        // If we are creating a user, provide the password fields.
        // Leave them out if we are editing.
        if (this.mode === 'create') {
            const passwordFields = [
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
            passwordFields.forEach(pwf => fields.push(pwf));
        }

        // Id field must only be added for edit forms.
        // If added to a create form, it won't be able to bind in the backend.
        if (entity && entity.object.id && entity.status !== LocalObjectStatus.CREATING) {
            fields.push(new Field({
                component: HiddenFieldComponent,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            }));
        }

        return fields;
    }
}
