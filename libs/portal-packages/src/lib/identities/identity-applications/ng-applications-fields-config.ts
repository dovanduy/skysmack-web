import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Application, APPLICATIONS_AREA_KEY } from '@skysmack/packages-identities';
import { NgApplicationsValidation } from '@skysmack/ng-packages';
import { LoadedPackage } from '@skysmack/ng-framework';
import { StringFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';

@Injectable({ providedIn: 'root' })
export class NgApplicationsFieldsConfig extends FieldsConfig<Application, number> {
    public validation = new NgApplicationsValidation();
    public area = APPLICATIONS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<Application, number>): Field[] {
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
                value: entity ? entity.object.concurrencyToken : undefined,
                key: 'concurrencyToken',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.consentType : undefined,
                key: 'consentType',
                validators: [Validators.required],
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
                value: entity ? entity.object.permissions : undefined,
                key: 'permissions',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.postLogoutRedirectUris : undefined,
                key: 'postLogoutRedirectUris',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.properties : undefined,
                key: 'properties',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.redirectUris : undefined,
                key: 'redirectUris',
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
