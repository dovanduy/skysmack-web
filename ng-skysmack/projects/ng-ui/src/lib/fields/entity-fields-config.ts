import { LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { Field } from './field';

export interface EntityFieldsConfig<TObject, TKey, TDependencies> {
    getStaticFields(entity?: LocalObject<TObject, TKey>, dependencies?: TDependencies): Field[];
    getFields(entity?: LocalObject<TObject, TKey>, dynamicFields?: LocalObject<FieldSchemaViewModel, string>[], dependencies?: TDependencies): Field[];
}
