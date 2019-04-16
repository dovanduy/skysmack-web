import { Injectable } from '@angular/core';
import { Field } from '@skysmack/ng-ui';
import { map } from 'rxjs/operators';
import { PersonsLodgingReservationsType } from '@skysmack/packages-persons-lodging-reservations';
import { Observable } from 'rxjs';
import { StrIndex, LocalObject } from '@skysmack/framework';
import { NgSettingsActions, NgSettingsStore, NgFieldActions } from '@skysmack/ng-redux';
import { NgPersonsStore, NgPersonsActions, NgSkysmackStore } from '@skysmack/ng-packages';
import { StringFieldComponent } from '@skysmack/portal-ui';
import { NgPersonsFieldsConfig } from '../persons/ng-persons-fields-config';
import { FieldProvider } from '@skysmack/portal-ui';
import { Person } from '@skysmack/packages-persons';
import { Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class NgProductPricingsFieldProvider extends FieldProvider {
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
            map(() => {
                return [
                    new Field({
                        component: StringFieldComponent,
                        value: entity ? entity.object.name : undefined,
                        key: 'name',
                        validators: [Validators.required],
                        order: 1,
                        showColumn: true
                    })
                ];
            }),
            // map(values => values.reduce((acc, cur) => acc.concat(cur), []).filter(x => x))
        );
    }
}