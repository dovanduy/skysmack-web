import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, CustomValidators, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { PhoneLog, PHONE_LOGS_AREA_KEY, PHONE_LOGS_ADDITIONAL_PATHS } from '@skysmack/packages-phones';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { HiddenFieldComponent, StringFieldComponent, DateFieldComponent, CheckboxFieldComponent, SelectFieldComponent } from '@skysmack/portal-fields';
import { NgPhoneLogsValidation, NgPhonesActions, NgPhonesStore } from '@skysmack/ng-phones';

@Injectable({ providedIn: 'root' })
export class NgPhoneLogsFieldsConfig extends FieldsConfig<PhoneLog, number> {
    public validation = new NgPhoneLogsValidation();
    public area = PHONE_LOGS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        private phonesActions: NgPhonesActions,
        private phonesStore: NgPhonesStore,
    ) {
        super(fieldProviders, PHONE_LOGS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<PhoneLog, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.sourceNumber : undefined,
                key: 'sourceNumber',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.destinationNumber : undefined,
                key: 'destinationNumber',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: DateFieldComponent,
                value: entity ? entity.object.started : undefined,
                key: 'started',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: DateFieldComponent,
                value: entity ? entity.object.connected : undefined,
                key: 'connected',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: DateFieldComponent,
                value: entity ? entity.object.ended : undefined,
                key: 'ended',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: entity ? entity.object.terminatedBySource : undefined,
                key: 'terminatedBySource',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            }),
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.sourcePhoneId : undefined,
                key: 'sourcePhoneId',
                displayKey: 'sourcePhone',
                displaySubKey: 'object.name',
                optionsData$: this.phonesStore.get(loadedPackage._package.path),
                getDependencies: () => { this.phonesActions.getPaged(loadedPackage._package.path, new PagedQuery()); },
                extraOptions: [{
                    value: null,
                    displayName: 'None'
                }],
                order: 1,
                showColumn: true
            }),
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.destinationPhoneId : undefined,
                key: 'destinationPhoneId',
                displayKey: 'destinationPhone',
                displaySubKey: 'object.name',
                optionsData$: this.phonesStore.get(loadedPackage._package.path),
                getDependencies: () => { this.phonesActions.getPaged(loadedPackage._package.path, new PagedQuery()); },
                extraOptions: [{
                    value: null,
                    displayName: 'None'
                }],
                order: 1,
                showColumn: true
            }),
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
