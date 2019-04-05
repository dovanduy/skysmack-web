import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, CustomValidators, Field, FieldProviders } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { User } from '@skysmack/packages-identities';
import { NgUsersValidation, LoadedPackage } from '@skysmack/ng-packages';
import { FieldsConfig, HiddenFieldComponent, PasswordFieldComponent, EmailFieldComponent } from '@skysmack/portal-ui';

@Injectable({ providedIn: 'root' })
export class NgUsersFieldsConfig extends FieldsConfig<User, number> {
    public validation = new NgUsersValidation();

    public formRules: FormRule[] = [];

    public mode: 'create' | 'edit' = 'create';

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<User, number>): Field[] {
        const fields = [
            new Field({
                component: EmailFieldComponent,
                value: entity ? entity.object.email : undefined,
                key: 'email',
                validators: [Validators.required, CustomValidators.validEmail()],
                order: 1,
                showColumn: true
            }),
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
