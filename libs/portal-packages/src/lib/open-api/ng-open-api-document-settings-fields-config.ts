import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { OpenApiDocumentSettings } from './open-api-document-settings';
import { LoadedPackage } from '@skysmack/ng-framework';
import { LocalObject } from '@skysmack/framework';
import { StringFieldComponent } from '@skysmack/portal-fields';
import { Injectable } from '@angular/core';
import { NgOpenApiDocumentSettingsValidation } from './ng-open-api-document-settings-validation';

@Injectable({ providedIn: 'root' })
export class NgOpenApiDocumentSettingsFieldsConfig extends FieldsConfig<OpenApiDocumentSettings, unknown> {
    public validation = new NgOpenApiDocumentSettingsValidation();
    public area = 'PORTAL_API';
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, []);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<OpenApiDocumentSettings, unknown>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.title : undefined,
                key: 'title',
                order: 1,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.description : undefined,
                key: 'description',
                order: 1,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.termsOfService : undefined,
                key: 'termsOfService',
                order: 1,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.contactName : undefined,
                key: 'contactName',
                order: 1,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.contactUrl : undefined,
                key: 'contactUrl',
                order: 1,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.contactEmail : undefined,
                key: 'contactEmail',
                order: 1,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.licenseName : undefined,
                key: 'licenseName',
                order: 1,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: settings ? settings.object.licenseUrl : undefined,
                key: 'licenseUrl',
                order: 1,
                sortable: true
            })
        ];

        return fields;
    }
}
