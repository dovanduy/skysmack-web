import { Injectable } from '@angular/core';
import { FieldProvider, Field, FieldTypes } from '@skysmack/ng-ui';
import { NgSkysmackStore } from '../skysmack-core/skysmack/redux/ng-skysmack-store';
import { map } from 'rxjs/operators';
import { PersonsLodgingReservationsType } from '@skysmack/packages-persons-lodging-reservations';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgPersonsLodgingReservationsFieldProvider extends FieldProvider {
    public areaKey = 'test';

    constructor(public skysmackStore: NgSkysmackStore) {
        super();
    }

    public getFields(packagePath: string): Observable<Field[]> {
        return this.skysmackStore.getPackages().pipe(
            map(packages => packages.filter(_package => _package.object.type === PersonsLodgingReservationsType.id)),
            map(packages => {
                const result = packages.map(_package => {
                    if (_package.object.dependencies[1] === packagePath) {
                        // "shouldBeExistingPersons": True = attach, false = add, null = both
                        return [
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
                    }
                }).reduce((acc, cur) => acc.concat(cur), []).filter(x => x);
                return result;
            })
        );
    }
}
