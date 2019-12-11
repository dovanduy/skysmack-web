import { Injectable } from '@angular/core';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { AccessPoint, ACCESS_POINTS_AREA_KEY, ACCESS_POINTS_ADDITIONAL_PATHS, NgAccessPointsValidation } from '@skysmack/ng-axis-physical-access-control';
import { LoadedPackage, getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { HiddenFieldComponent, SelectFieldComponent } from '@skysmack/portal-fields';
import { Validators } from '@angular/forms';
import { NgDoorwaysStore, NgDoorwaysActions } from '@skysmack/ng-doorways';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { take, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgAccessPointsFieldsConfig extends FieldsConfig<AccessPoint, string> {
    public validation = new NgAccessPointsValidation();
    public area = ACCESS_POINTS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        private doorwaysStore: NgDoorwaysStore,
        private doorwaysActions: NgDoorwaysActions,
        private skysmackStore: NgSkysmackStore,
    ) {
        super(fieldProviders, ACCESS_POINTS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<AccessPoint, string>): Field[] {
        const doorwaysPackage$ = getPackageDendencyAsStream(this.skysmackStore, loadedPackage._package.path, [0]);

        const fields: Field[] = [
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.doorwayId : undefined,
                key: 'doorwayId',
                displayKey: 'doorway',
                displaySubKey: 'object.name',
                optionsData$: this.doorwaysStore.get(loadedPackage._package.dependencies[0]),
                getDependencies: () => {
                    doorwaysPackage$.pipe(
                        map(doorwaysPackage => this.doorwaysActions.getPaged(doorwaysPackage.object.path, new PagedQuery())),
                        take(1)
                    ).subscribe();
                },
                validators: [Validators.required],
                order: 1,
                showColumn: true
            })
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
