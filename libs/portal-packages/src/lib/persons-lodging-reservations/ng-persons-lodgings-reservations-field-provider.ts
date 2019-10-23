import { Injectable } from '@angular/core';
import { Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { map, switchMap } from 'rxjs/operators';
import { PersonsLodgingReservationsSettings } from '@skysmack/packages-persons-lodging-reservations';
import { Observable, combineLatest, of } from 'rxjs';
import { StrIndex, PagedQuery, LocalObject } from '@skysmack/framework';
import { NgSettingsActions, NgSettingsStore, NgFieldActions } from '@skysmack/ng-framework';
import { NgPersonsStore, NgPersonsActions } from '@skysmack/ng-persons';
import { NgPersonsFieldsConfig } from '../persons/ng-persons-fields-config';
import { Person } from '@skysmack/packages-persons';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { LODGING_RESERVATIONS_AREA_KEY } from '@skysmack/packages-lodging-reservations';
import { FieldProvider, AddField } from '@skysmack/ng-fields';
import { AddRecordFieldComponent, MultiSelectFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { PersonsLodgingReservationsTypeId } from '@skysmack/package-types';
import { Guid } from 'guid-typescript';

@Injectable({ providedIn: 'root' })
export class NgPersonsLodgingReservationsFieldProvider extends FieldProvider {

    public id = Guid.create().toString();
    public register: StrIndex<boolean> = {};

    constructor(
        public personsStore: NgPersonsStore,
        public personsActions: NgPersonsActions,
        public personsFieldsConfig: NgPersonsFieldsConfig,
        public skysmackStore: NgSkysmackStore,
        public settingsActions: NgSettingsActions,
        public settingsStore: NgSettingsStore,
        public fieldActions: NgFieldActions
    ) {
        super();
    }

    public getFields(packagePath: string, area: string, entity?: LocalObject<Person, number>): Observable<Field[]> {
        this.register = {};
        if (area === LODGING_RESERVATIONS_AREA_KEY) {
            return this.skysmackStore.getPackages().pipe(
                map(packages => packages.filter(_package => _package.object.type === PersonsLodgingReservationsTypeId && _package.object.dependencies[1] === packagePath)),
                switchMap(packages => {
                    if (packages && packages.length > 0) {
                        const fieldStreams$ = packages.map(_package => {
                            // Request the package settings - only ONCE per. getFields() call.
                            const depPackagePath = _package.object.path;
                            if (!this.register[depPackagePath]) {
                                this.settingsActions.get(depPackagePath, 'persons-reservations');
                                this.register[depPackagePath] = true;
                            }

                            // Request pesons + added fields - only ONCE per. getFields() call.
                            const personsPackagePath = _package.object.dependencies[0];
                            if (!this.register[personsPackagePath]) {
                                this.personsActions.getPaged(personsPackagePath, new PagedQuery());
                                this.fieldActions.getPaged(personsPackagePath, new PagedQuery());
                                this.register[personsPackagePath] = true;
                            }

                            return this.settingsStore.get<PersonsLodgingReservationsSettings>(depPackagePath, 'persons-reservations').pipe(
                                map(settings => {
                                    const addField = new AddField({
                                        component: AddRecordFieldComponent,
                                        addTitle: 'Add persons',
                                        displaySelector: 'displayName',
                                        actions: this.personsActions,
                                        store: this.personsStore,
                                        fieldsConfig: this.personsFieldsConfig,
                                        packagePath: personsPackagePath,
                                        value: undefined,
                                        key: 'extendedData.' + personsPackagePath + '.add',
                                        label: personsPackagePath,
                                        placeholder: personsPackagePath,
                                    });

                                    const selectField = new SelectField({
                                        component: MultiSelectFieldComponent,
                                        value: undefined,
                                        key: 'extendedData.' + personsPackagePath + '.attach',
                                        optionsData$: this.personsStore.get(personsPackagePath),
                                        displayNameSelector: 'object.displayName',
                                        label: personsPackagePath,
                                        placeholder: personsPackagePath,
                                    });

                                    const extendedData = entity ? entity.object['extendedData'] : undefined;

                                    const currentlySelectedIdsField = new Field({
                                        component: HiddenFieldComponent,
                                        value: extendedData ? extendedData[depPackagePath] && extendedData[depPackagePath]['ids'] : undefined,
                                        key: 'extendedData.' + personsPackagePath + '.ids',
                                    });

                                    switch (settings.object.shouldBeExistingPersons) {
                                        case true: return [selectField];
                                        case false: return [addField];
                                        default: return [selectField, addField, currentlySelectedIdsField];
                                    }
                                })
                            );
                        });
                        return combineLatest([
                            fieldStreams$
                        ]);
                    } else {
                        return of([]);
                    }
                }),
                map(values => values.reduce((acc, cur) => acc.concat(cur), []).filter(x => x))
            );
        } else {
            return of([]);
        }
    }
}
