import { Injectable } from '@angular/core';
import { FieldProvider, Field, FieldTypes } from '@skysmack/ng-ui';
import { NgSkysmackStore } from '../skysmack-core/skysmack/redux/ng-skysmack-store';
import { map, switchMap } from 'rxjs/operators';
import { PersonsLodgingReservationsType, PersonsLodgingReservationsSettings } from '@skysmack/packages-persons-lodging-reservations';
import { Observable, combineLatest } from 'rxjs';
import { NgSettingsActions, NgSettingsStore } from '@skysmack/ng-redux';
import { StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgPersonsLodgingReservationsFieldProvider extends FieldProvider {
    public areaKey = 'test';
    public settingsRequested: StrIndex<boolean> = {};

    constructor(
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
                        if (!this.settingsRequested[depPackagePath]) {
                            this.settingsActions.get(depPackagePath, 'persons-reservations');
                            this.settingsRequested[depPackagePath] = true;
                        }

                        // Get settings
                        return this.settingsStore.get<PersonsLodgingReservationsSettings>(depPackagePath, 'persons-reservations').pipe(
                            map(settings => {
                                switch (settings.object.shouldBeExistingPersons) {
                                    case true: return [
                                        new Field({
                                            fieldType: FieldTypes.string,
                                            value: undefined,
                                            key: 'extendedData.' + _package.object.path + '.attach',
                                            label: '',
                                            placeholder: '',
                                            order: 4,
                                            showColumn: true
                                        })
                                    ];
                                    case false: return [
                                        new Field({
                                            fieldType: FieldTypes.string,
                                            value: undefined,
                                            key: 'extendedData.' + _package.object.path + '.add',
                                            label: '',
                                            placeholder: '',
                                            order: 4,
                                            showColumn: true
                                        })
                                    ];
                                    default: return [
                                        new Field({
                                            fieldType: FieldTypes.string,
                                            value: undefined,
                                            key: 'extendedData.' + _package.object.path + '.attach',
                                            label: '',
                                            placeholder: '',
                                            order: 4,
                                            showColumn: true
                                        }),
                                        new Field({
                                            fieldType: FieldTypes.string,
                                            value: undefined,
                                            key: 'extendedData.' + _package.object.path + '.add',
                                            label: '',
                                            placeholder: '',
                                            order: 4,
                                            showColumn: true
                                        })
                                    ];
                                }
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