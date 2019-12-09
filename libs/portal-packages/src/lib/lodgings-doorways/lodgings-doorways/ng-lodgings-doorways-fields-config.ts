import { Injectable } from '@angular/core';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { LodgingDoorway, LODGINGS_DOORWAYS_AREA_KEY, LODGINGS_DOORWAYS_ADDITIONAL_PATHS, LodgingDoorwayKey, NgLodgingsDoorwaysValidation } from '@skysmack/ng-lodgings-doorways';
import { LoadedPackage, getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { HiddenFieldComponent, SelectFieldComponent } from '@skysmack/portal-fields';
import { Validators } from '@angular/forms';
import { NgDoorwaysStore, NgDoorwaysActions } from '@skysmack/ng-doorways';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { take, map } from 'rxjs/operators';
import { NgLodgingsStore, NgLodgingsActions } from '@skysmack/ng-lodgings';

@Injectable({ providedIn: 'root' })
export class NgLodgingsDoorwaysFieldsConfig extends FieldsConfig<LodgingDoorway, LodgingDoorwayKey> {
    public validation = new NgLodgingsDoorwaysValidation();
    public area = LODGINGS_DOORWAYS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        private doorwaysStore: NgDoorwaysStore,
        private doorwaysActions: NgDoorwaysActions,
        private lodgingsStore: NgLodgingsStore,
        private lodgingsActions: NgLodgingsActions,
        private skysmackStore: NgSkysmackStore,
    ) {
        super(fieldProviders, LODGINGS_DOORWAYS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<LodgingDoorway, LodgingDoorwayKey>): Field[] {
        const lodgingsPackage$ = getPackageDendencyAsStream(this.skysmackStore, loadedPackage._package.path, [0]);
        const doorwaysPackage$ = getPackageDendencyAsStream(this.skysmackStore, loadedPackage._package.path, [1]);

        const fields: Field[] = [
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.doorwayId : undefined,
                key: 'doorwayId',
                displayKey: 'doorway',
                displaySubKey: 'object.name',
                optionsData$: this.doorwaysStore.get(loadedPackage._package.dependencies[1]),
                getDependencies: () => {
                    doorwaysPackage$.pipe(
                        map(doorwaysPackage => this.doorwaysActions.getPaged(doorwaysPackage.object.path, new PagedQuery())),
                        take(1)
                    ).subscribe();
                },
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.lodgingId : undefined,
                key: 'lodgingId',
                displayKey: 'lodging',
                displaySubKey: 'object.name',
                displayNameSelector: 'object.name',
                optionsData$: this.lodgingsStore.get(loadedPackage._package.dependencies[0]),
                getDependencies: () => {
                    lodgingsPackage$.pipe(
                        map(lodgingsPackage => this.lodgingsActions.getPaged(lodgingsPackage.object.path, new PagedQuery())),
                        take(1)
                    ).subscribe();
                },
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
