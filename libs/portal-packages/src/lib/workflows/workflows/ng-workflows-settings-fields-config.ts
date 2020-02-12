import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { LocalObject } from '@skysmack/framework';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { CheckboxFieldComponent } from '@skysmack/portal-fields';
import { WORKFLOWS_AREA_KEY, WORKFLOWS_ADDITIONAL_PATHS, WorkflowSettings } from '@skysmack/packages-workflows';
import { NgWorkflowSettingsValidation } from './ng-workflows-settings-validation';

@Injectable({ providedIn: 'root' })
export class NgWorkflowSettingsFieldsConfig extends FieldsConfig<WorkflowSettings, unknown> {
    public validation = new NgWorkflowSettingsValidation();
    public area = WORKFLOWS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, WORKFLOWS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<WorkflowSettings, unknown>): Field[] {
        const fields = [
            new Field({
                component: CheckboxFieldComponent,
                value: settings ? settings.object.enabled : false,
                key: 'enabled',
                order: 3
            })
        ];

        return fields;
    }
}
