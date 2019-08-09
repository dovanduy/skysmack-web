import { LocalObject } from '@skysmack/framework';
import { FormRule, Validation, Field } from '@skysmack/ng-dynamic-forms';
import { EntityFieldsConfig } from './entity-fields-config';
import { Observable, combineLatest, of } from 'rxjs';
import { map, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FieldProviders } from './field-providers';
import { LoadedPackage } from '@skysmack/ng-framework';

export abstract class FieldsConfig<TRecord, TKey> implements EntityFieldsConfig<TRecord, TKey> {
    public abstract formRules: FormRule[];
    public abstract validation: Validation;
    public abstract area: string;

    constructor(public fieldProviders: FieldProviders) { }

    public getFields(loadedPackage: LoadedPackage, entity?: LocalObject<TRecord, TKey>): Observable<Field[]> {
        return this.getRecordFields(loadedPackage, entity).pipe(
            map(fields => this.addValidationErrors(fields, entity))
        );
    }

    protected getRecordFields(loadedPackage: LoadedPackage, entity?: LocalObject<TRecord, TKey>): Observable<Field[]> {
        const staticFields = this.getStaticFields(loadedPackage, entity);
        return this.getProvidedFields(loadedPackage, entity).pipe(
            distinctUntilChanged(),
            map(values => {
                return staticFields.concat(values);
            })
        );
    }

    protected abstract getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<TRecord, TKey>): Field[];

    protected getStaticFields(loadedPackage: LoadedPackage, entity?: LocalObject<TRecord, TKey>): Field[] {
        const fieldArea = this.validation.area.toUpperCase() + '.FORM.';
        return this.getEntityFields(loadedPackage, entity).map(field => {
            field.label = fieldArea + 'LABELS.' + field.key.toUpperCase();
            field.placeholder = fieldArea + 'PLACEHOLDERS.' + field.key.toUpperCase();
            return field;
        });
    }

    protected addValidationErrors(fields: Field[], entity?: LocalObject<TRecord, TKey>) {
        if (entity && entity.apiError) {
            return fields.map(field => {
                const validationErrors = entity.apiError.validationErrors.find(error => error.fieldKey === field.key);
                field.errors = validationErrors && validationErrors.errors;
                return field;
            });
        } else {
            return fields;
        }
    }

    private getProvidedFields(loadedPackage: LoadedPackage, entity?: LocalObject<TRecord, TKey>): Observable<Field[]> {
        return this.fieldProviders.providers$.pipe(
            switchMap(providers => {
                const extractedProviders = providers[loadedPackage && loadedPackage.packageManifest && loadedPackage.packageManifest.id];

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
