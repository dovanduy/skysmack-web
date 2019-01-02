import { Field } from './../../fields/field';
import { SelectField } from './../../fields/select-field';
import { FormRule } from '../form-rule';
import { getProperty } from '@skysmack/framework';

export class FilterSelectionRule extends FormRule {
    constructor(
        public keys: string[],
        /**
         * Key of the first selection field.
         */
        public selectionFieldKey: string,

        /**
         * If you want to use another property value than the default for the select key, set the path to the desired prop here.
         * Example: Default value is "type", but you want "leftDependencyId". Then set this property to "leftDependencyId".
         */
        public selectionFieldPropSelector: string,

        /**
         * Key of the targeted selection field which needs its options sorted
         */
        public targetFieldKey: string,

        /**
         * Selector for the target field property. Default is object.id
         * The value of this property must match the value selected from the selectionFieldKey to pass the filter!
         */
        public targetFieldPropSelector: string = 'object.id',
    ) { super(keys); }

    protected rule(dependencies: { fields: Field[], selectedValue: any }) {
        // If selectionFieldPropSelector isn't set, we can simply use the already selected value.
        // If selectionFieldPropSelector IS set, we'll have to find the desired property value via getPropertyValue()
        const value = this.selectionFieldPropSelector ? this.getPropertyValue(dependencies) : dependencies.selectedValue;

        // The filter for the targetField
        const filter = {
            key: this.targetFieldPropSelector,
            value
        };

        // Reset filter and add the newest
        const targetField = this.getField(dependencies.fields, this.targetFieldKey) as SelectField;
        targetField.filters = [filter];
    }

    /**
     * Finds the selected data from the optionsData and extracts the desired property value.
     */
    public getPropertyValue(dependencies: { fields: Field[], selectedValue: any }) {
        const fields = dependencies.fields;
        const selectedValue = dependencies.selectedValue;
        const optionsData = (this.getField(fields, this.selectionFieldKey) as SelectField).optionsData;

        if (Array.isArray(optionsData)) {
            return optionsData
                // Find the selected option (the correct data will have a prop with the same value as the selected one)
                .map(data => getProperty(data, this.selectionFieldKey) === selectedValue ? data : undefined)
                .filter(x => x)
                // Take the desired property from the data and return it.
                .map(data => getProperty(data, this.selectionFieldPropSelector))[0];
        }
        // else {
        // TODO: This part is not confirmed to work. Need test data. Also see TODO in SelectField class.
        // return Object.keys(optionsData).map(key => {
        //     if (optionsData[key] === selectedValue) {
        //         return optionsData[key];
        //     }
        // }).filter(x => x)[0];
        // }
    }
}
