import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, Field, CustomValidators } from '@skysmack/ng-dynamic-forms';
import { EmailFieldComponent } from '@skysmack/portal-fields';
import { CommercialAccountForgotPasswordValidation } from './commercial-account-forgot-password-validation';
import { LoadedPackage } from '@skysmack/ng-framework';
import { LocalObject } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class CommercialAccountForgotPasswordFieldsConfig {
    public validation = new CommercialAccountForgotPasswordValidation();
    public area = '';
    public formRules: FormRule[] = [];

    constructor() { }

    public getFields(loadedPackage: LoadedPackage, entity?: LocalObject<any, any>): Field[] {
        const fields = [
            new Field({
                component: EmailFieldComponent,
                value: undefined,
                key: 'email',
                validators: [Validators.required, CustomValidators.validEmail()],
                order: 1,
                sortable: true
            })
        ];

        return fields;
    }
}
