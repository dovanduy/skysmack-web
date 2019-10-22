import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, Field, CustomValidators } from '@skysmack/ng-dynamic-forms';
import { EmailFieldComponent, PasswordFieldComponent, StringFieldComponent } from '@skysmack/portal-fields';
import { CommercialAccountRegisterValidation } from './commercial-account-register-validation';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { LoadedPackage } from '@skysmack/ng-framework';
import { LocalObject } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class CommercialAccountRegisterFieldsConfig extends FieldsConfig<any, any>{
    public validation = new CommercialAccountRegisterValidation();
    public area = '';
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, []);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<any, any>): Field[] {
        const fields = [
            new Field({
                component: EmailFieldComponent,
                value: undefined,
                key: 'email',
                validators: [Validators.required, CustomValidators.validEmail()],
                order: 1,
                sortable: true
            }),
            new Field({
                component: PasswordFieldComponent,
                value: undefined,
                key: 'password',
                validators: [Validators.required],
                order: 2,
                sortable: true
            }),
            new Field({
                component: PasswordFieldComponent,
                value: undefined,
                key: 'confirmPassword',
                validators: [Validators.required],
                order: 2,
                sortable: true
            }),
        ];

        return fields;
    }
}
