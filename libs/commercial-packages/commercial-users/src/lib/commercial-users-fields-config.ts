import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { StringFieldComponent, PasswordFieldComponent } from '@skysmack/portal-fields';
import { CommercialUsersValidation } from './commercial-users-validation';
import { LocalObject } from '@skysmack/framework';
import { PartnerUser } from './models/partner-user';

@Injectable({ providedIn: 'root' })
export class CommercialUsersFieldsConfig {
    public validation = new CommercialUsersValidation();
    public area = '';
    public formRules: FormRule[] = [];

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

            new Field({
                component: PasswordFieldComponent,
                value: entity ? entity.object.password : undefined,
                key: 'password',
                validators: [Validators.required],
                order: 1,
            }),

            new Field({
                component: PasswordFieldComponent,
                value: entity ? entity.object.confirmPassword : undefined,
                key: 'confirmPassword',
                validators: [Validators.required],
                order: 1,
            }),
        ];

        return fields;
    }
}
