import { Injectable } from '@angular/core';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { LocalObject } from '@skysmack/framework';
import { TemplatePackageSettings } from '@skysmack/packages-identities';
import { NgTemplatePackageSettingsValidation } from '@skysmack/ng-identities';
import { LoadedPackage } from '@skysmack/ng-framework';
import { OAUTH2_AREA_KEY } from '@skysmack/packages-oauth2';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { SelectFieldComponent } from '@skysmack/portal-fields';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { TemplatesTypeId } from '@skysmack/package-types';
import { of } from 'rxjs';
import { ReplaceSelectFieldStreamRule } from './replace-select-field-stream-rule';
import { NgTemplatesStore, NgTemplatesActions } from '@skysmack/ng-templates';

@Injectable({ providedIn: 'root' })
export class NgTemplatePackageSettingsFieldsConfig extends FieldsConfig<TemplatePackageSettings, unknown> {
    public validation = new NgTemplatePackageSettingsValidation();
    public area = OAUTH2_AREA_KEY;
    public formRules: FormRule[] = [
        new ReplaceSelectFieldStreamRule(['templatePackagePath'], this.templatesStore, this.templatesActions)
    ];

    constructor(
        public fieldProviders: FieldProviders,
        private skysmackStore: NgSkysmackStore,
        private templatesStore: NgTemplatesStore,
        private templatesActions: NgTemplatesActions
    ) {
        super(fieldProviders, []);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<TemplatePackageSettings, unknown>): Field[] {

        const fields = [
            new SelectField({
                component: SelectFieldComponent,
                value: settings ? settings.object.templatePackagePath : undefined,
                key: 'templatePackagePath',
                displayKey: 'templatePackagePath',
                valueSelector: 'path',
                displayNameSelector: 'name',
                optionsData$: this.skysmackStore.getPackageByTypeId(TemplatesTypeId),
                order: 1,
                showColumn: true
            }),

            new SelectField({
                component: SelectFieldComponent,
                value: settings ? settings.object.confirmEmailTemplateId : undefined,
                key: 'confirmEmailTemplateId',
                displayNameSelector: 'object.title',
                optionsData$: of([]),
                order: 2,
                showColumn: true
            }),

            new SelectField({
                component: SelectFieldComponent,
                value: settings ? settings.object.resetPasswordTemplateId : undefined,
                key: 'resetPasswordTemplateId',
                displayNameSelector: 'object.title',
                optionsData$: of([]),
                order: 2,
                showColumn: true
            })
        ];

        return fields;
    }
}
