import { Injectable } from '@angular/core';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { DoorwayPassCode, DOORWAYS_PASS_CODES_AREA_KEY, DOORWAYS_PASS_CODES_ADDITIONAL_PATHS, DoorwayPassCodeKey, NgDoorwaysPassCodesValidation } from '@skysmack/ng-doorways-pass-codes';
import { LoadedPackage, getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { HiddenFieldComponent, SelectFieldComponent, DateTimeFieldComponent, CheckboxFieldComponent } from '@skysmack/portal-fields';
import { Validators } from '@angular/forms';
import { NgDoorwaysStore, NgDoorwaysActions } from '@skysmack/ng-doorways';
import { NgPassCodesStore, NgPassCodesActions } from '@skysmack/ng-pass-codes';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { take, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgDoorwaysPassCodesFieldsConfig extends FieldsConfig<DoorwayPassCode, DoorwayPassCodeKey> {
    public validation = new NgDoorwaysPassCodesValidation();
    public area = DOORWAYS_PASS_CODES_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        private doorwaysStore: NgDoorwaysStore,
        private doorwaysActions: NgDoorwaysActions,
        private passCodesStore: NgPassCodesStore,
        private passCodesActions: NgPassCodesActions,
        private skysmackStore: NgSkysmackStore,
    ) {
        super(fieldProviders, DOORWAYS_PASS_CODES_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<DoorwayPassCode, DoorwayPassCodeKey>): Field[] {
        const doorwaysPackage$ = getPackageDendencyAsStream(this.skysmackStore, loadedPackage._package.path, [0]);
        const passCodesPackage$ = getPackageDendencyAsStream(this.skysmackStore, loadedPackage._package.path, [1]);

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
            }),
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.passCodeId : undefined,
                key: 'passCodeId',
                displayKey: 'passCode',
                displaySubKey: 'object.code',
                displayNameSelector: 'object.code',
                optionsData$: this.passCodesStore.get(loadedPackage._package.dependencies[1]).pipe(tap(x => console.log(x))),
                getDependencies: () => {
                    passCodesPackage$.pipe(
                        map(passCodesPackage => this.passCodesActions.getPaged(passCodesPackage.object.path, new PagedQuery())),
                        take(1)
                    ).subscribe();
                },
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),
            new Field({
                component: DateTimeFieldComponent,
                value: entity ? entity.object.validFrom : undefined,
                key: 'validFrom',
                order: 2,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: DateTimeFieldComponent,
                value: entity ? entity.object.validTo : undefined,
                key: 'validTo',
                order: 2,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: entity && entity.object ? entity.object.disabled : false,
                label: 'Disabled',
                key: 'disabled',
                order: 3,
                showColumn: true,
                sortable: true
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
