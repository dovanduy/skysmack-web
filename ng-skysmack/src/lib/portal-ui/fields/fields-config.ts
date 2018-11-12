import { FormRule } from '../forms/form-rule';
import { EntityValidation } from '../forms/entity-validation';
import { LocalObject } from '@skysmack/framework';
import { Field } from './field';

export abstract class FieldsConfig {
    public abstract formRules: FormRule[];
    public abstract validation: EntityValidation;
    protected abstract getEntityFields(entity?: LocalObject<any>, dependencies?: any): Field[];

    public getStaticFields(entity?: LocalObject<any>, dependencies?: any): Field[] {
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
