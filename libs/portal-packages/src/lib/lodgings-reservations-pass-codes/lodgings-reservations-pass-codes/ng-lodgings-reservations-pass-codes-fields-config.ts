import { Injectable } from '@angular/core';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { LodgingReservationPassCode, LODGINGS_RESERVATIONS_PASS_CODES_AREA_KEY, LODGINGS_RESERVATIONS_PASS_CODES_ADDITIONAL_PATHS, LodgingReservationPassCodeKey, NgLodgingsReservationsPassCodesValidation } from '@skysmack/ng-lodgings-reservations-pass-codes';
import { LoadedPackage, getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { HiddenFieldComponent, SelectFieldComponent } from '@skysmack/portal-fields';
import { Validators } from '@angular/forms';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { take, map } from 'rxjs/operators';
import { NgPassCodesStore, NgPassCodesActions } from '@skysmack/ng-pass-codes';
import { NgLodgingReservationsStore, NgLodgingReservationsActions } from '@skysmack/ng-lodging-reservations';

@Injectable({ providedIn: 'root' })
export class NgLodgingsReservationsPassCodesFieldsConfig extends FieldsConfig<LodgingReservationPassCode, LodgingReservationPassCodeKey> {
    public validation = new NgLodgingsReservationsPassCodesValidation();
    public area = LODGINGS_RESERVATIONS_PASS_CODES_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        private logingsReservationsStore: NgLodgingReservationsStore,
        private logingsReservationsActions: NgLodgingReservationsActions,
        private passCodesStore: NgPassCodesStore,
        private passCodesActions: NgPassCodesActions,
        private skysmackStore: NgSkysmackStore,
    ) {
        super(fieldProviders, LODGINGS_RESERVATIONS_PASS_CODES_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<LodgingReservationPassCode, LodgingReservationPassCodeKey>): Field[] {
        const logingsReservationsPackage$ = getPackageDendencyAsStream(this.skysmackStore, loadedPackage._package.path, [0]);
        const passCodesPackage$ = getPackageDendencyAsStream(this.skysmackStore, loadedPackage._package.path, [1]);

        const fields: Field[] = [
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.lodgingReservationId : undefined,
                key: 'logingsReservationId',
                displayKey: 'logingsReservation',
                displaySubKey: 'object.id',
                optionsData$: this.logingsReservationsStore.get(loadedPackage._package.dependencies[0]),
                getDependencies: () => {
                    logingsReservationsPackage$.pipe(
                        map(logingsReservationsPackage => this.logingsReservationsActions.getPaged(logingsReservationsPackage.object.path, new PagedQuery())),
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
                displaySubKey: 'object.name',
                displayNameSelector: 'object.name',
                optionsData$: this.passCodesStore.get(loadedPackage._package.dependencies[1]),
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
