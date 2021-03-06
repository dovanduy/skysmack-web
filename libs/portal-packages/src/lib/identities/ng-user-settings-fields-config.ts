import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { LocalObject } from '@skysmack/framework';
import { UserSettings, USERS_AREA_KEY, USERS_ADDITIONAL_PATHS } from '@skysmack/packages-identities';
import { NgUserSettingsValidation } from '@skysmack/ng-identities';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { StringFieldComponent, CheckboxFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgUserSettingsFieldsConfig extends FieldsConfig<UserSettings, unknown> {
    public validation = new NgUserSettingsValidation();
    public area = USERS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, USERS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<UserSettings, unknown>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.allowedUserNameCharacters : undefined,
                key: 'allowedUserNameCharacters',
                order: 1,
                sortable: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: settings ? settings.object.requireUniqueEmail : false,
                key: 'requireUniqueEmail',
                order: 2,
                sortable: true
            })
        ];

        return fields;
    }
}
