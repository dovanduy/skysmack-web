import { LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { Field } from './field';
import { LoadedPackage } from '@skysmack/ng-packages';

export interface EntityFieldsConfig<TObject, TKey, TDependencies> {
    getStaticFields(entity?: LocalObject<TObject, TKey>, dependencies?: TDependencies, loadedPackage?: LoadedPackage): Field[];
    getFields(entity?: LocalObject<TObject, TKey>, fields?: LocalObject<FieldSchemaViewModel, string>[], dependencies?: TDependencies, loadedPackage?: LoadedPackage): Field[];
}
