import { LocalObject } from '@skysmack/framework';
import { FormRule, Validation, Field } from '@skysmack/ng-ui';
import { LoadedPackage } from '@skysmack/ng-packages';
import { EntityFieldsConfig } from './entity-fields-config';
import { Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
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
        return combineLatest(
            of(this.getStaticFields(loadedPackage, entity)),
            this.getProvidedFields(loadedPackage)
        ).pipe(
            map(values => values[0].concat(values[1]))
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

    private getProvidedFields(loadedPackage: LoadedPackage): Observable<Field[]> {
        console.log(JSON.stringify(this.fieldProviders, undefined, 2));
        // Object.keys(this.fieldProviders.providers).forEach(key =>
        //     console.log('key', key, loadedPackage.packageManifest.id, key === loadedPackage.packageManifest.id)
        // );
        console.log(this.fieldProviders.providers)
        const providers = Array.isArray(this.fieldProviders.providers[loadedPackage.packageManifest.id]) ? this.fieldProviders.providers[loadedPackage.packageManifest.id] : [];
        console.log('providers', providers);
        if (providers && providers.length > 0) {
            console.log('provided fields');
            return combineLatest(
                providers.map(provider => {
                    console.log('getProvidedFields', loadedPackage);
                    return provider.getFields(loadedPackage._package.path);
                })
            ).pipe(
                map((values: [Field[]]) => {
                    return values.reduce((acc: Field[], cur: Field[]) => acc.concat(cur), []);
                })
            );
        } else {
            console.log('no provided fields');
            return of([]);
        }
    }
}
