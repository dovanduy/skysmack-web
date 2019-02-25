import { FormRule } from '../forms/form-rule';
import { LocalObject, DisplayColumn } from '@skysmack/framework';
import { Field } from './field';
import { Validation } from '../forms/validation';

export abstract class FieldsConfig<TRecord, TDependencies> {
    public abstract formRules: FormRule[];
    public abstract validation: Validation;
    protected abstract getEntityFields(entity?: LocalObject<TRecord, any>, dependencies?: any): Field[];

    public getStaticFields(entity?: LocalObject<TRecord, any>, dependencies?: TDependencies): Field[] {
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
