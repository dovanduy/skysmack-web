import { ValidatorFn } from '@angular/forms';
import { FieldTypes } from './field-types';

export class Field {
    /**
     * Key (property) e.g. "firstName"
     */
    public key: string;

    /**
     * Form label e.g. "First Name"
     */
    public label = '';

    /**
     * Decides when this field should be shown. 1 comes first, 2 seconds, etc.
     */
    public order: number;

    /**
     * Group the field belongs to.
     */
    public groupName: 'default' | 'fields' = 'default';

    /**
     * Field validations, if any.
     */
    public validators: ValidatorFn[];

    /**
     * Default value e.g. "John"
     */
    public value?: any;

    /**
     * Field type e.g. datetime field, select field, etc.
     */
    public fieldType: FieldTypes;

    /**
     * Placeholder content e.g. "Write your first name here, please"
     */
    public placeholder = '';

    /**
     * Set to false. Field is shown, but disabled for input.
     */
    public disabled = false;

    /**
     * Whether the data table should show  this field as a column
     */
    public showColumn = false;

    constructor(values: Field) {
        Object.assign(this, values);
    }
}
