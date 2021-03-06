import { Injectable } from '@angular/core';
import { LocalObject, LocalObjectStatus, HttpMethod } from '@skysmack/framework';
import { Template, TEMPLATES_AREA_KEY, TEMPLATES_ADDITIONAL_PATHS } from '@skysmack/packages-templates';
import { NgTemplatesValidation } from '@skysmack/ng-templates';
import { LoadedPackage } from '@skysmack/ng-framework';
import { Validators } from '@angular/forms';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { StringFieldComponent, HiddenFieldComponent, SelectFieldComponent, KeyValueArrayFieldComponent } from '@skysmack/portal-fields';
import { of } from 'rxjs';
import { WYSIWYGEditorFieldComponent } from '../../wysiwyg';

@Injectable({ providedIn: 'root' })
export class NgTemplatesFieldsConfig extends FieldsConfig<Template, number> {
    public validation = new NgTemplatesValidation();
    public area = TEMPLATES_AREA_KEY;
    public formRules: FormRule[] = [
    ];

    constructor(
        public fieldProviders: FieldProviders
    ) {
        super(fieldProviders, TEMPLATES_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<Template, number>): Field[] {
        let dataRouteArray = [];
        if (entity && entity.object.dataRoutes) {
            dataRouteArray = Object.keys(entity.object.dataRoutes).map(key => ({ key, value: entity.object.dataRoutes[key] }));
        }

        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.title : undefined,
                key: 'title',
                order: 1,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: WYSIWYGEditorFieldComponent,
                value: entity ? entity.object.body : undefined,
                key: 'body',
                order: 2,
            }),
            new Field({
                component: KeyValueArrayFieldComponent,
                value: entity ? dataRouteArray : undefined,
                key: 'dataRoutes',
                order: 3,
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
