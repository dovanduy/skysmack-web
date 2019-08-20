import { Injectable } from '@angular/core';
import { LocalObject } from '@skysmack/framework';
import { LoadedPackage } from '@skysmack/ng-framework';
import { SmtpClientSettings, EMAILS_SMTP_AREA_KEY, EMAILS_SMTP_ADDITIONAL_PATHS } from '@skysmack/packages-emails-smtp';
import { NgEmailsSmtpSettingsValidation } from '../../../../ng-packages/ng-email-smtp/src/lib';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { StringFieldComponent, IntFieldComponent, CheckboxFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgEmailsSmptSettingsFieldsConfig extends FieldsConfig<SmtpClientSettings, unknown> {
    public validation = new NgEmailsSmtpSettingsValidation();
    public area = EMAILS_SMTP_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, EMAILS_SMTP_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<SmtpClientSettings, unknown>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.host : undefined,
                key: 'host',
                order: 1,
                sortable: true
            }),
            new Field({
                component: IntFieldComponent,
                value: settings ? settings.object.port : undefined,
                key: 'port',
                order: 2,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.username : undefined,
                key: 'username',
                order: 3,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.password : undefined,
                key: 'password',
                order: 4,
                sortable: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: settings ? settings.object.enableSsl : undefined,
                key: 'enableSsl',
                order: 5,
                sortable: true
            })
        ];

        return fields;
    }
}
