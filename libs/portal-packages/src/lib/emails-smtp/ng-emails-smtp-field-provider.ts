import { Injectable } from '@angular/core';
import { Field } from '@skysmack/ng-ui';
import { Observable, of } from 'rxjs';
import { StrIndex, LocalObject } from '@skysmack/framework';
import { FieldProvider } from '@skysmack/portal-ui';

@Injectable({ providedIn: 'root' })
export class NgEmailsSmtpFieldProvider extends FieldProvider {

    public register: StrIndex<boolean> = {};

    constructor(
        // public personsStore: NgPersonsStore,
        // public personsActions: NgPersonsActions,
        // public personsFieldsConfig: NgPersonsFieldsConfig,
        // public skysmackStore: NgSkysmackStore,
        // public settingsActions: NgSettingsActions,
        // public settingsStore: NgSettingsStore,
        // public fieldActions: NgFieldActions
    ) {
        super();
    }

    public getFields(packagePath: string, area: string, entity?: LocalObject<any, any>): Observable<Field[]> {

        return of();

        // this.register = {};
        // if (area === LODGING_RESERVATIONS_AREA_KEY) {
        //     return this.skysmackStore.getPackages().pipe(
        //         map(packages => packages.filter(_package => _package.object.type === PersonsLodgingReservationsType.id && _package.object.dependencies[1] === packagePath)),
        //         switchMap(packages => {
        //             if (packages && packages.length > 0) {
        //                 const fieldStreams$ = packages.map(_package => {
        //                     // Request the package settings - only ONCE per. getFields() call.
        //                     const depPackagePath = _package.object.path;
        //                     if (!this.register[depPackagePath]) {
        //                         this.settingsActions.get(depPackagePath, 'persons-reservations');
        //                         this.register[depPackagePath] = true;
        //                     }

        //                     // Request pesons + added fields - only ONCE per. getFields() call.
        //                     const personsPackagePath = _package.object.dependencies[0];
        //                     if (!this.register[personsPackagePath]) {
        //                         this.personsActions.getPaged(personsPackagePath, new PagedQuery());
        //                         this.fieldActions.getPaged(personsPackagePath, new PagedQuery());
        //                         this.register[personsPackagePath] = true;
        //                     }

        //                     return this.settingsStore.get<PersonsLodgingReservationsSettings>(depPackagePath, 'persons-reservations').pipe(
        //                         map(settings => {
        //                             const addField = new AddField({
        //                                 component: AddRecordFieldComponent,
        //                                 addTitle: 'Add persons',
        //                                 displaySelector: 'displayName',
        //                                 actions: this.personsActions,
        //                                 store: this.personsStore,
        //                                 fieldsConfig: this.personsFieldsConfig,
        //                                 packagePath: personsPackagePath,
        //                                 value: undefined,
        //                                 key: 'extendedData.' + personsPackagePath + '.add',
        //                                 label: personsPackagePath,
        //                                 placeholder: personsPackagePath,
        //                             });

        //                             const selectField = new SelectField({
        //                                 component: MultiSelectFieldComponent,
        //                                 value: undefined,
        //                                 key: 'extendedData.' + personsPackagePath + '.attach',
        //                                 optionsData$: this.personsStore.get(personsPackagePath),
        //                                 displayNameSelector: 'object.displayName',
        //                                 label: personsPackagePath,
        //                                 placeholder: personsPackagePath,
        //                             });

        //                             const extendedData = entity ? entity.object['extendedData'] : undefined;

        //                             const currentlySelectedIdsField = new Field({
        //                                 component: HiddenFieldComponent,
        //                                 value: extendedData ? extendedData[depPackagePath] && extendedData[depPackagePath]['ids'] : undefined,
        //                                 key: 'extendedData.' + personsPackagePath + '.ids',
        //                             });

        //                             switch (settings.object.shouldBeExistingPersons) {
        //                                 case true: return [selectField];
        //                                 case false: return [addField];
        //                                 default: return [selectField, addField, currentlySelectedIdsField];
        //                             }
        //                         })
        //                     );
        //                 });
        //                 return combineLatest(fieldStreams$);
        //             } else {
        //                 return of([]);
        //             }
        //         }),
        //         map(values => values.reduce((acc, cur) => acc.concat(cur), []).filter(x => x))
        //     );
        // } else {
        //     return of([]);
        // }
    }
}
