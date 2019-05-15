import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';
import { UserSettings, USERS_AREA_KEY } from '@skysmack/packages-identities';
import { NgUserSettingsValidation } from '@skysmack/ng-packages';
import { LoadedPackage } from '@skysmack/ng-redux';
import { FieldsConfig, StringFieldComponent, CheckboxFieldComponent } from '@skysmack/portal-ui';
import { FieldProviders } from '@skysmack/portal-ui';

@Injectable({ providedIn: 'root' })
export class NgUserSettingsFieldsConfig extends FieldsConfig<UserSettings, unknown> {
    public validation = new NgUserSettingsValidation();
    public area = USERS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<UserSettings, unknown>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.allowedUserNameCharacters : undefined,
                key: 'allowedUserNameCharacters',
                order: 1
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: settings ? settings.object.requireUniqueEmail : undefined,
                key: 'requireUniqueEmail',
                order: 2
            })
        ];

        return fields;
    }
}
