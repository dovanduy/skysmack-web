import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, CustomValidators, Field } from '@skysmack/ng-dynamic-forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Phone, PHONES_AREA_KEY, PHONES_ADDITIONAL_PATHS } from '@skysmack/packages-phones';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { HiddenFieldComponent, StringFieldComponent } from '@skysmack/portal-fields';
import { NgPhonesValidation } from '@skysmack/ng-phones';

@Injectable({ providedIn: 'root' })
export class NgPhonesFieldsConfig extends FieldsConfig<Phone, number> {
    public validation = new NgPhonesValidation();
    public area = PHONES_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, PHONES_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<Phone, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            })
        ];

        // Id field must only be added for edit forms.
        // If added to a create form, it won't be able to bind in the backend.
        if (entity && entity.object.id && entity.status !== LocalObjectStatus.CREATING) {
            fields.push(new Field({
                component: HiddenFieldComponent,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            }));
        }

        return fields;
    }
}
