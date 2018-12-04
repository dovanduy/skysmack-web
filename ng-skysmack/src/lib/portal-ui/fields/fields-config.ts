import { FormRule } from '../forms/form-rule';
import { LocalObject } from '@skysmack/framework';
import { Field } from './field';
import { RecordValidation } from '../forms/record-validation';

export abstract class FieldsConfig<TRecord, TDependencies> {
    public abstract formRules: FormRule[];
    public abstract validation: RecordValidation;
    protected abstract getEntityFields(entity?: LocalObject<TRecord>, dependencies?: any): Field[];

    public getStaticFields(entity?: LocalObject<TRecord>, dependencies?: TDependencies): Field[] {
        const fieldArea = this.validation.area.toUpperCase() + '.FORM.';
        return this.getEntityFields(entity, dependencies).map(field => {
            // Labels
            field.label = fieldArea + 'LABELS.' + field.key.toUpperCase();
            // Placeholders
            field.placeholder = fieldArea + 'PLACEHOLDERS.' + field.key.toUpperCase();
            return field;
        });
    }
}
