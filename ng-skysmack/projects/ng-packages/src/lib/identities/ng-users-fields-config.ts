import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, CustomValidators, Field, FieldTypes, FieldsConfig } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { User } from '@skysmack/packages-identities';
import { NgUsersValidation } from './ng-users-validation';

export interface NgUserFormDependencies {
    [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgUsersFieldsConfig extends FieldsConfig<User, number, NgUserFormDependencies> {
    public validation = new NgUsersValidation();

    public formRules: FormRule[] = [];

    public mode: 'create' | 'edit' = 'create';

    protected getEntityFields(entity?: LocalObject<User, number>, dependencies?: NgUserFormDependencies): Field[] {
        const fields = [
            new Field({
                fieldType: FieldTypes.EmailField,
                value: entity ? entity.object.email : undefined,
                key: 'email',
                validators: [Validators.required, CustomValidators.validEmail()],
                order: 1,
                showColumn: true
            } as Field),
        ];

        // If we are creating a user, provide the password fields.
        // Leave them out if we are editing.
        if (this.mode === 'create') {
            const passwordFields = [
                new Field({
                    fieldType: FieldTypes.PasswordField,
                    value: undefined,
                    key: 'password',
                    label: 'Password',
                    validators: [Validators.required, CustomValidators.validPassword()],
                    order: 2,
                    placeholder: 'Password',
                } as Field),

                new Field({
                    fieldType: FieldTypes.PasswordField,
                    value: undefined,
                    key: 'confirmPassword',
                    label: 'Confirm password',
                    validators: [Validators.required],
                    order: 3,
                    placeholder: 'Password',
                } as Field)
            ];
            passwordFields.forEach(pwf => fields.push(pwf));
        }

        // Id field must only be added for edit forms.
        // If added to a create form, it won't be able to bind in the backend.
        if (entity && entity.object.id && entity.status !== LocalObjectStatus.CREATING) {
            fields.push(new Field({
                fieldType: FieldTypes.HiddenField,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            } as Field));
        }

        return fields;
    }
}
