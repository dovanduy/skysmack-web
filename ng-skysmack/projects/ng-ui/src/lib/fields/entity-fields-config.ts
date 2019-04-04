import { LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { Field } from './field';
import { LoadedPackage } from '@skysmack/ng-packages';

export interface EntityFieldsConfig<TObject, TKey> {
    getStaticFields(loadedPackage: LoadedPackage, entity?: LocalObject<TObject, TKey>): Field[];
    getFields(loadedPackage: LoadedPackage, entity?: LocalObject<TObject, TKey>, fields?: LocalObject<FieldSchemaViewModel, string>[]): Field[];
}
