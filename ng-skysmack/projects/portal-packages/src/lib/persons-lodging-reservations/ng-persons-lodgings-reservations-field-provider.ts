import { Injectable } from '@angular/core';
import { FieldProvider, Field, SelectField } from '@skysmack/ng-ui';
import { map, switchMap } from 'rxjs/operators';
import { PersonsLodgingReservationsType, PersonsLodgingReservationsSettings } from '@skysmack/packages-persons-lodging-reservations';
import { Observable, combineLatest, of } from 'rxjs';
import { StrIndex, PagedQuery } from '@skysmack/framework';
import { NgSettingsActions, NgSettingsStore } from '@skysmack/ng-redux';
import { NgPersonsStore, NgPersonsActions, NgSkysmackStore } from '@skysmack/ng-packages';
import { MultiSelectFieldComponent, AddField, AddRecordFieldComponent } from '@skysmack/portal-ui';
import { NgPersonsFieldsConfig } from '../persons/ng-persons-fields-config';

@Injectable({ providedIn: 'root' })
export class NgPersonsLodgingReservationsFieldProvider extends FieldProvider {
    public areaKey = 'test';
    public requested: StrIndex<boolean> = {};

    constructor(
        public personsStore: NgPersonsStore,
        public personsActions: NgPersonsActions,
        public personsFieldsConfig: NgPersonsFieldsConfig,
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

                        // TODO: Do something about requests only being done once (but beware they aren't fired more than once pr. "component life time")

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

                        return this.settingsStore.get<PersonsLodgingReservationsSettings>(depPackagePath, 'persons-reservations').pipe(
                            map(settings => {
                                const addField = new AddField({
                                    component: AddRecordFieldComponent,
                                    actions: this.personsActions,
                                    store: this.personsStore,
                                    fieldsConfig: this.personsFieldsConfig,
                                    dynamicFields: true,
                                    titleTranslationString: 'PERSONS.CREATE.CREATE',
                                    value: undefined,
                                    key: 'extendedData.' + _package.object.path + '.add',
                                    label: personsPackagePath,
                                    placeholder: personsPackagePath,
                                    order: 4,
                                    showColumn: true
                                });

                                const selectField = new SelectField({
                                    component: MultiSelectFieldComponent,
                                    value: undefined,
                                    key: 'extendedData.' + _package.object.path + '.attach',
                                    optionsData$: this.personsStore.get(personsPackagePath),
                                    displayNameSelector: 'object.displayName',
                                    label: personsPackagePath,
                                    placeholder: personsPackagePath,
                                    order: 4,
                                    showColumn: true
                                });

                                switch (settings.object.shouldBeExistingPersons) {
                                    case true: return [selectField];
                                    case false: return [addField];
                                    default: return [selectField, addField];
                                }
                            })
                        );
                    } else {
                        return of([]);
                    }
                });

                return combineLatest(fieldStreams$);
            }),
            map(values => values.reduce((acc, cur) => acc.concat(cur), []).filter(x => x))
        );
    }
}