import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject } from '@skysmack/framework';
import { APPLICATIONS_AREA_KEY, ApplicationDescriptor } from '@skysmack/packages-identities';
import { NgApplicationsValidation } from '@skysmack/ng-identities';
import { LoadedPackage } from '@skysmack/ng-framework';
import { StringFieldComponent } from '@skysmack/portal-fields';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';

@Injectable({ providedIn: 'root' })
export class NgApplicationsFormFieldsConfig extends FieldsConfig<ApplicationDescriptor, number> {
    public validation = new NgApplicationsValidation();
    public area = APPLICATIONS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<ApplicationDescriptor, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.clientId : undefined,
                key: 'clientId',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.clientSecret : undefined,
                key: 'clientSecret',
                order: 1,
                showColumn: true
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.consentType : undefined,
                key: 'consentType',
                order: 1,
                showColumn: true
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.displayName : undefined,
                key: 'displayName',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.type : undefined,
                key: 'type',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            })
        ];

        return fields;
    }
}
