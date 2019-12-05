import { Injectable } from '@angular/core';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { LocalObject } from '@skysmack/framework';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { CheckboxFieldComponent } from '@skysmack/portal-fields';
import { DoorwaysRelationSettings } from './models/doorways-relation-settings';
import { DOORWAYS_AREA_KEY, DOORWAYS_ADDITIONAL_PATHS } from './constants/constants';
import { NgDoorwaysRelationSettingsValidation } from './ng-doorways-relation-settings-validation';

@Injectable({ providedIn: 'root' })
export class NgDoorwaysRelationSettingsFieldsConfig extends FieldsConfig<DoorwaysRelationSettings, unknown> {
    public validation = new NgDoorwaysRelationSettingsValidation();
    public area = DOORWAYS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders, DOORWAYS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, settings?: LocalObject<DoorwaysRelationSettings, unknown>): Field[] {
        const fields = [
            new Field({
                component: CheckboxFieldComponent,
                value: settings ? settings.object.allowCircularRelations : false,
                key: 'allowCircularRelations',
                order: 2,
                sortable: true
            })
        ];

        return fields;
    }
}
