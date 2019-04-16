import { Injectable } from '@angular/core';
import { Field, SelectField } from '@skysmack/ng-ui';
import { map, switchMap } from 'rxjs/operators';
import { PersonsLodgingReservationsType, PersonsLodgingReservationsSettings } from '@skysmack/packages-persons-lodging-reservations';
import { Observable, combineLatest } from 'rxjs';
import { StrIndex, PagedQuery, LocalObject } from '@skysmack/framework';
import { NgSettingsActions, NgSettingsStore, NgFieldActions } from '@skysmack/ng-redux';
import { NgPersonsStore, NgPersonsActions, NgSkysmackStore } from '@skysmack/ng-packages';
import { MultiSelectFieldComponent, AddField, AddRecordFieldComponent, HiddenFieldComponent } from '@skysmack/portal-ui';
import { NgPersonsFieldsConfig } from '../persons/ng-persons-fields-config';
import { FieldProvider } from '@skysmack/portal-ui';
import { Person } from '@skysmack/packages-persons';

@Injectable({ providedIn: 'root' })
export class NgPersonsLodgingReservationsFieldProvider extends FieldProvider {
    public requested: StrIndex<boolean> = {};

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

    public getFields(packagePath: string, entity?: LocalObject<Person, number>): Observable<Field[]> {
        return this.skysmackStore.getPackages().pipe(
            map(packages => packages.filter(_package => _package.object.type === PersonsLodgingReservationsType.id && _package.object.dependencies[1] === packagePath)),
            switchMap(packages => {
                const fieldStreams$ = packages.map(_package => {
                    // TODO: Do something about requests only being done once (but beware they aren't fired more than once pr. "component life time")

                    // Request the package settings - only ONCE per. package per. app lifetime.
                    const depPackagePath = _package.object.path;
                    if (!this.requested[depPackagePath]) {
                        this.settingsActions.get(depPackagePath, 'persons-reservations');
                        this.requested[depPackagePath] = true;
                    }

                    // Request pesons + added fields - only ONCE per. package per. app lifetime.
                    const personsPackagePath = _package.object.dependencies[0];
                    if (!this.requested[personsPackagePath]) {
                        this.personsActions.getPaged(personsPackagePath, new PagedQuery());
                        this.fieldActions.getPaged(personsPackagePath, new PagedQuery());
                        this.requested[personsPackagePath] = true;
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
                                key: 'extendedData.' + _package.object.path + '.add',
                                label: personsPackagePath,
                                placeholder: personsPackagePath,
                            });

                            const selectField = new SelectField({
                                component: MultiSelectFieldComponent,
                                value: undefined,
                                key: 'extendedData.' + _package.object.path + '.attach',
                                optionsData$: this.personsStore.get(personsPackagePath),
                                displayNameSelector: 'object.displayName',
                                label: personsPackagePath,
                                placeholder: personsPackagePath,
                            });

                            const extendedData = entity ? entity.object['extendedData'] : undefined;

                            const currentlySelectedIdsField = new Field({
                                component: HiddenFieldComponent,
                                value: extendedData ? extendedData[depPackagePath]['ids'] : undefined,
                                key: 'extendedData.' + _package.object.path + '.ids',
                            });

                            switch (settings.object.shouldBeExistingPersons) {
                                case true: return [selectField];
                                case false: return [addField];
                                default: return [selectField, addField, currentlySelectedIdsField];
                            }
                        })
                    );
                });

                return combineLatest(fieldStreams$);
            }),
            map(values => values.reduce((acc, cur) => acc.concat(cur), []).filter(x => x))
        );
    }
}