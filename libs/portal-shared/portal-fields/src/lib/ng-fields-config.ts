import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { FieldsValidation } from '@skysmack/ng-fields';
import { FieldsConfig } from '@skysmack/ng-fields';
import { StringFieldComponent } from './field-components/components/string-field/string-field.component';
import { SelectFieldComponent } from './field-components/components/select-field/select-field.component';
import { ValidatorsFieldComponent } from './field-components/components/validators-field/validators-field.component';
import { NgFieldStore } from '@skysmack/ng-framework';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FieldProviders } from '@skysmack/ng-fields';
import { Router } from '@angular/router';
import { UI_AREA_KEY } from '@skysmack/portal-ui';
import { FormRule, SetFieldKeyRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { Observable, combineLatest, of } from 'rxjs';
import { switchMap, distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgFieldsConfig extends FieldsConfig<FieldSchemaViewModel, string> {
    public validation = new FieldsValidation();
    public area = UI_AREA_KEY;
    public formRules: FormRule[] = [
        new SetFieldKeyRule(['display'])
    ];

    constructor(
        public store: NgFieldStore,
        public fieldProviders: FieldProviders,
        public router: Router
    ) {
        super(fieldProviders, []);
    }

    public setAdditionalPaths(additionalPaths: string[]): void {
        this.additionalPaths = additionalPaths;
    }

    /**
     * Gets the fields for the form used to create or edit a dynamic field.
     * @param availableFields Possible dynamic fields to create. Recieved from the backend.
     * @param field Optional field can be providedto set default values. Used to edit an existing field.
     */
    protected getEntityFields(loadedPackage: LoadedPackage, field?: LocalObject<FieldSchemaViewModel, string>): Field[] {
        let stateKey = loadedPackage._package.path;

        if (this.additionalPaths && this.additionalPaths.length > 0) {
            stateKey = stateKey + '-' + this.additionalPaths;
        }

        const fields = [
            new Field({
                component: StringFieldComponent,
                value: field ? field.object.display : undefined,
                key: 'display',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            }),

            new Field({
                component: StringFieldComponent,
                value: field ? field.object.key : undefined,
                key: 'key',
                validators: [Validators.required],
                order: 2,
                disabled: field ? true : false,
                showColumn: true,
                sortable: true
            }),

            new SelectField({
                component: SelectFieldComponent,
                value: field ? field.object.type : undefined,
                key: 'type',
                validators: [Validators.required],
                order: 3,
                optionsData$: this.store.getAvailableFields(stateKey),
                valueSelector: 'object.name',
                disabled: field ? true : false,
                showColumn: true,
                sortable: true
            }),

            new Field({
                component: ValidatorsFieldComponent,
                value: field ? field.object.validators : undefined,
                key: 'validators',
                order: 4,
                sortable: true
            })
        ];

        return fields;
    }

    protected getProvidedFields(loadedPackage: LoadedPackage, entity?: LocalObject<FieldSchemaViewModel, string>): Observable<Field[]> {
        return this.fieldProviders.providers$.pipe(
            switchMap(providers => {
                const extractedProviders = providers['fields'];

                if (extractedProviders && extractedProviders.length > 0) {
                    return combineLatest(
                        extractedProviders.map(provider => {
                            return provider.getFields(loadedPackage._package.path, this.area, entity);
                        })
                    ).pipe(
                        distinctUntilChanged(),
                        map((values: [Field[]]) => {
                            return values.reduce((acc: Field[], cur: Field[]) => acc.concat(cur), []);
                        })
                    );
                } else {
                    return of([]);
                }
            })
        );
    }
}
