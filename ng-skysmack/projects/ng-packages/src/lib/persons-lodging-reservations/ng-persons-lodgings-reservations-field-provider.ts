import { Injectable } from '@angular/core';
import { FieldProvider, Field, FieldTypes, SelectField } from '@skysmack/ng-ui';
import { NgSkysmackStore } from '../skysmack-core/skysmack/redux/ng-skysmack-store';
import { map, switchMap } from 'rxjs/operators';
import { PersonsLodgingReservationsType, PersonsLodgingReservationsSettings } from '@skysmack/packages-persons-lodging-reservations';
import { Observable, combineLatest } from 'rxjs';
import { NgSettingsActions, NgSettingsStore } from '@skysmack/ng-redux';
import { StrIndex, PagedQuery } from '@skysmack/framework';
import { NgPersonsStore, NgPersonsActions } from '../persons/redux';

@Injectable({ providedIn: 'root' })
export class NgPersonsLodgingReservationsFieldProvider extends FieldProvider {
    public areaKey = 'test';
    public requested: StrIndex<boolean> = {};

    constructor(
        public personsStore: NgPersonsStore,
        public personsActions: NgPersonsActions,
        public skysmackStore: NgSkysmackStore,
        public settingsActions: NgSettingsActions,
        public settingsStore: NgSettingsStore
    ) {
        super();
    }

    public getFields(packagePath: string): Observable<Field[]> {

        return this.skysmackStore.getPackages().pipe(
            map(packages => packages.filter(_package => _package.object.type === PersonsLodgingReservationsType.id)),
            switchMap(packages => {
                const fieldStreams$ = packages.map(_package => {

                    if (_package.object.dependencies[1] === packagePath) {

                        // Request the package settings - only ONCE per. package per. app lifetime.
                        const depPackagePath = _package.object.path;
                        if (!this.requested[depPackagePath]) {
                            this.settingsActions.get(depPackagePath, 'persons-reservations');
                            this.requested[depPackagePath] = true;
                        }

                        // Request the pesons - only ONCE per. package per. app lifetime.
                        const personsPackagePath = _package.object.dependencies[0];
                        if (!this.requested[personsPackagePath]) {
                            this.personsActions.getPaged(personsPackagePath, new PagedQuery());
                            this.requested[personsPackagePath] = true;
                        }

                        return this.personsStore.get(personsPackagePath).pipe(
                            switchMap(persons => {
                                // Get settings
                                return this.settingsStore.get<PersonsLodgingReservationsSettings>(depPackagePath, 'persons-reservations').pipe(
                                    map(settings => {
                                        switch (settings.object.shouldBeExistingPersons) {
                                            case true: return [
                                                new SelectField({
                                                    fieldType: FieldTypes.MultiSelectField,
                                                    value: undefined,
                                                    key: 'extendedData.' + _package.object.path + '.attach',
                                                    optionsData: persons,
                                                    displayNameSelector: 'object.displayName',
                                                    label: personsPackagePath,
                                                    placeholder: personsPackagePath,
                                                    order: 4,
                                                    showColumn: true
                                                })
                                            ];
                                            case false: return [
                                                new SelectField({
                                                    fieldType: FieldTypes.MultiSelectField,
                                                    value: undefined,
                                                    key: 'extendedData.' + _package.object.path + '.add',
                                                    optionsData: persons,
                                                    displayNameSelector: 'object.displayName',
                                                    label: personsPackagePath,
                                                    placeholder: personsPackagePath,
                                                    order: 4,
                                                    showColumn: true
                                                })
                                            ];
                                            default: return [
                                                new SelectField({
                                                    fieldType: FieldTypes.MultiSelectField,
                                                    value: undefined,
                                                    key: 'extendedData.' + _package.object.path + '.attach',
                                                    optionsData: persons,
                                                    displayNameSelector: 'object.displayName',
                                                    label: personsPackagePath,
                                                    placeholder: personsPackagePath,
                                                    order: 4,
                                                    showColumn: true
                                                }),
                                                new SelectField({
                                                    fieldType: FieldTypes.MultiSelectField,
                                                    value: undefined,
                                                    key: 'extendedData.' + _package.object.path + '.add',
                                                    optionsData: persons,
                                                    displayNameSelector: 'object.displayName',
                                                    label: personsPackagePath,
                                                    placeholder: personsPackagePath,
                                                    order: 4,
                                                    showColumn: true
                                                })
                                            ];
                                        }
                                    })
                                );
                            })
                        );
                    }
                });

                return combineLatest(fieldStreams$);
            }),
            map(values => values.reduce((acc, cur) => acc.concat(cur), []).filter(x => x))
        );
    }
}