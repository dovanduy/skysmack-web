import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, Field, CustomValidators } from '@skysmack/ng-dynamic-forms';
import { StringFieldComponent, PasswordFieldComponent } from '@skysmack/portal-fields';
import { CommercialUsersValidation } from './commercial-users-validation';
import { LocalObject } from '@skysmack/framework';
import { PartnerUser } from './models/partner-user';

@Injectable({ providedIn: 'root' })
export class CommercialUsersFieldsConfig {
    public validation = new CommercialUsersValidation();
    public area = '';
    public formRules: FormRule[] = [];

    public mode: 'create' | 'edit' = 'create';

    constructor() { }

    public getFields(entity?: LocalObject<PartnerUser, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.email : undefined,
                key: 'email',
                validators: [Validators.required],
                order: 1,
            }),

            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.userName : undefined,
                key: 'userName',
                validators: [Validators.required],
                order: 1,
            }),
        ];

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

        return fields;
    }
}
