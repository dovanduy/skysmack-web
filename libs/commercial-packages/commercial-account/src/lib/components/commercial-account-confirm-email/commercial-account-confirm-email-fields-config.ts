import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, Field, CustomValidators } from '@skysmack/ng-dynamic-forms';
import { EmailFieldComponent, StringFieldComponent } from '@skysmack/portal-fields';
import { CommercialAccountConfirmEmailValidation } from './commercial-account-confirm-email-validation';
import { ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CommercialAccountConfirmEmailFieldsConfig {
    public validation = new CommercialAccountConfirmEmailValidation();
    public area = '';
    public formRules: FormRule[] = [];

    constructor(private route: ActivatedRoute) { }

    public getFields(email = undefined, token = undefined): Field[] {
        const fields = [
            new Field({
                component: EmailFieldComponent,
                value: email,
                key: 'email',
                placeholder: 'COMMERCIAL_ACCOUNT.FORM.PLACEHOLDERS.EMAIL',
                validators: [Validators.required, CustomValidators.validEmail()],
                order: 1,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: token,
                key: 'token',
                placeholder: 'COMMERCIAL_ACCOUNT.FORM.PLACEHOLDERS.TOKEN',
                validators: [Validators.required],
                order: 1,
                sortable: true
            })
        ];

        return fields;
    }
}
