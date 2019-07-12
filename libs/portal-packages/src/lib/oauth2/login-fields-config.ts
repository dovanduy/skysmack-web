import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, Field, CustomValidators } from '@skysmack/ng-dynamic-forms';
import { LoginValidation } from './login-validation';
import { LocalObject } from '@skysmack/framework';
import { LoadedPackage } from '@skysmack/ng-framework';
import { OAUTH2_AREA_KEY } from '@skysmack/packages-oauth2';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { EmailFieldComponent, PasswordFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class LoginFieldsConfig extends FieldsConfig<any, any> {
    public validation = new LoginValidation();
    public area = OAUTH2_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<any, any>): Field[] {
        const fields = [
            new Field({
                component: EmailFieldComponent,
                value: undefined,
                key: 'email',
                validators: [Validators.required, CustomValidators.validEmail()],
                order: 1,
            }),

            new Field({
                component: PasswordFieldComponent,
                value: undefined,
                key: 'password',
                validators: [Validators.required],
                order: 2,
            })
        ];

        return fields;
    }
}
