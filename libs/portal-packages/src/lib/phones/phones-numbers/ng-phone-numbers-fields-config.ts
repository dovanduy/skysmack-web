import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { PhoneNumber, PHONE_NUMBERS_AREA_KEY, PHONE_NUMBERS_ADDITIONAL_PATHS } from '@skysmack/packages-phones';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { HiddenFieldComponent, StringFieldComponent, CheckboxFieldComponent, SelectFieldComponent } from '@skysmack/portal-fields';
import { NgPhoneNumbersValidation, NgPhonesActions, NgPhonesStore } from '@skysmack/ng-phones';

@Injectable({ providedIn: 'root' })
export class NgPhoneNumbersFieldsConfig extends FieldsConfig<PhoneNumber, number> {
    public validation = new NgPhoneNumbersValidation();
    public area = PHONE_NUMBERS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        private phonesActions: NgPhonesActions,
        private phonesStore: NgPhonesStore,
    ) {
        super(fieldProviders, PHONE_NUMBERS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<PhoneNumber, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.number : undefined,
                key: 'number',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: entity ? entity.object.internal : undefined,
                key: 'internal',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            }),
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.phoneId : undefined,
                key: 'phoneId',
                displayKey: 'phone',
                displaySubKey: 'object.name',
                validators: [Validators.required],
                optionsData$: this.phonesStore.get(loadedPackage._package.path),
                getDependencies: () => { this.phonesActions.getPaged(loadedPackage._package.path, new PagedQuery()); },
                order: 1,
                showColumn: true
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
