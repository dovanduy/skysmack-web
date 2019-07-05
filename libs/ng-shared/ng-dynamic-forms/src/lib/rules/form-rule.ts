import { FormGroup, AbstractControl } from '@angular/forms';
import { Field } from '../models/field';

export abstract class FormRule {
    public static type: string;
    public type: string;

    /**
     * Form to run the rule against
     */
    public form: FormGroup;

    constructor(
        /*
        * Field keys this rule will run on
         */
        public keys: string[]
    ) { }

    /**
     * The specific rule logic
     */
    protected abstract rule(dependencies?: any);

    /**
     * Runs the rule
     * @param form The form to run the rule against
     */
    public runRule(form: FormGroup, dependencies?: any) {
        this.form = form;
        this.rule(dependencies);
    }

    /**
     * Finds and returns a field.
     * @param fields Fields to search in
     * @param targetKey Key of the field to find
     */
    public getField(fields: Field[], targetKey: string): Field {
        return Object.keys(fields).map(key => {
            if (fields[key].key === targetKey) {
                return fields[key];
            }
        }).filter(x => x)[0];
    }

    /**
     * Gets the default FormGroup.
     */
    protected getDefaultGroupControls(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }
}
