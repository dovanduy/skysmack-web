import { Injectable } from '@angular/core';
import { FieldProvider, Field, FieldTypes } from '@skysmack/ng-ui';
import { NgSkysmackStore } from '../skysmack-core/skysmack/redux/ng-skysmack-store';
import { map } from 'rxjs/operators';
import { PersonsLodgingReservationsType } from '@skysmack/packages-persons-lodging-reservations';

@Injectable({ providedIn: 'root' })
export class NgPersonsLodgingReservationsFieldProvider extends FieldProvider {
    public areaKey = 'test';

    constructor(public skysmackStore: NgSkysmackStore) {
        super();

    }

    public getFields(packagePath: string): Promise<Field[]> {
        console.log('gooo');
        return this.skysmackStore.getPackages().pipe(
            map(packages => packages.filter(_package => _package.object.type === PersonsLodgingReservationsType.id)),
            map(packages => {
                const result = packages.map(_package => {
                    console.log(_package)
                    if (_package.object.dependencies[1] === packagePath) {
                        return [
                            new Field({
                                fieldType: FieldTypes.string,
                                value: undefined,
                                key: '',
                                label: '',
                                placeholder: '',
                                order: 4,
                                showColumn: true
                            })
                        ];
                    }
                }).reduce((acc, cur) => acc.concat(cur), []).filter(x => x);
                console.log({ result });
                return result;
            })
        ).toPromise();
    }
}
