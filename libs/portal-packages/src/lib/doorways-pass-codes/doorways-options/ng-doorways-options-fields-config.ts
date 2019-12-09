import { Injectable } from '@angular/core';
import { LocalObject, PagedQuery, LocalObjectStatus } from '@skysmack/framework';
import { LoadedPackage, getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { CheckboxFieldComponent, StringFieldComponent, SelectFieldComponent } from '@skysmack/portal-fields';
import { DoorwayOption, NgDoorwaysOptionsValidation, DOORWAYS_OPTIONS_AREA_KEY, DOORWAYS_OPTIONS_ADDITIONAL_PATHS } from '@skysmack/ng-doorways-pass-codes';
import { NgDoorwaysStore, NgDoorwaysActions } from '@skysmack/ng-doorways';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map, take } from 'rxjs/operators';
import { Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class NgDoorwaysOptionsFieldsConfig extends FieldsConfig<DoorwayOption, number> {
    public validation = new NgDoorwaysOptionsValidation();
    public area = DOORWAYS_OPTIONS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        private doorwaysStore: NgDoorwaysStore,
        private doorwaysActions: NgDoorwaysActions,
        private skysmackStore: NgSkysmackStore
    ) {
        super(fieldProviders, DOORWAYS_OPTIONS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<DoorwayOption, number>): Field[] {
        const doorwaysPackage$ = getPackageDendencyAsStream(this.skysmackStore, loadedPackage._package.path, [0]);
        let fields: Field[] = [];

        const idField = new SelectField({
            component: SelectFieldComponent,
            value: entity ? entity.object.id : undefined,
            key: 'id',
            optionsData$: this.doorwaysStore.get(loadedPackage._package.dependencies[0]),
            getDependencies: () => {
                doorwaysPackage$.pipe(
                    map(doorwaysPackage => this.doorwaysActions.getPaged(doorwaysPackage.object.path, new PagedQuery())),
                    take(1)
                ).subscribe();
            },
            validators: [Validators.required],
            order: 1,
        });


        // Id must NOT be edited
        if (!entity) {
            fields.push(idField);
        } else if (entity && entity.object.id && entity.status !== LocalObjectStatus.CREATING) {
            idField.disabled = true;
            fields.push(idField);
        }

        fields = fields.concat([
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.startPeriod : 'P1DT1H1M1S1s',
                key: 'startPeriod',
                order: 2,
                showColumn: true
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.endPeriod : 'P1DT1H1M1S1s',
                key: 'endPeriod',
                order: 2,
                showColumn: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: entity && entity.object ? entity.object.required : false,
                label: 'Required',
                key: 'required',
                order: 3,
                showColumn: true,
                sortable: true
            }),
        ]);

        return fields;
    }
}
