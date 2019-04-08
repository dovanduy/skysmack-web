import { LocalObject } from '@skysmack/framework';
import { FormRule, Validation, Field } from '@skysmack/ng-ui';
import { LoadedPackage } from '@skysmack/ng-packages';
import { EntityFieldsConfig } from './entity-fields-config';
import { Observable, combineLatest, of } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { FieldProviders } from './field-providers';

export abstract class FieldsConfig<TRecord, TKey> implements EntityFieldsConfig<TRecord, TKey> {
    public abstract formRules: FormRule[];
    public abstract validation: Validation;

    constructor(public fieldProviders: FieldProviders) { }

    public getFields(loadedPackage: LoadedPackage, entity?: LocalObject<TRecord, TKey>): Observable<Field[]> {
        return this.getRecordFields(loadedPackage, entity).pipe(
            map(fields => this.addValidationErrors(fields, entity).sort((a, b) => a.order - b.order))
        );
    }

    protected getRecordFields(loadedPackage: LoadedPackage, entity?: LocalObject<TRecord, TKey>): Observable<Field[]> {
        return this.getProvidedFields(loadedPackage, entity).pipe(
            distinctUntilChanged(),
            map(values => this.getStaticFields(loadedPackage, entity).concat(values))
        );
    }

    protected abstract getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<TRecord, TKey>): Field[];

    protected getStaticFields(loadedPackage: LoadedPackage, entity?: LocalObject<TRecord, TKey>): Field[] {
        const fieldArea = this.validation.area.toUpperCase() + '.FORM.';
        return this.getEntityFields(loadedPackage, entity).map(field => {
            // Labels
            field.label = fieldArea + 'LABELS.' + field.key.toUpperCase();
            // Placeholders
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
        if (this.fieldProviders) {
            const providers = this.fieldProviders.providers[loadedPackage && loadedPackage.packageManifest && loadedPackage.packageManifest.id];
            if (providers && providers.length > 0) {
                return combineLatest(
                    providers.map(provider => {
                        return provider.getFields(loadedPackage._package.path, entity);
                    })
                ).pipe(
                    distinctUntilChanged(),
                    map((values: [Field[]]) => {
                        return values.reduce((acc: Field[], cur: Field[]) => acc.concat(cur), []);
                    }),
                );
            } else {
                return of([]);
            }
        } else {
            return of([]);
        }
    }
}
