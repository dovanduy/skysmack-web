import { Field } from './field';
import { SelectFieldOption } from './select-field-option';
import { getProperty } from '@skysmack/framework';
import { FieldHelpers } from './field-helpers';
import { Observable } from 'rxjs';

export class SelectField extends Field {
    /**
     * Data for the select field. Can be an array or enum
     */
    public optionsData: any;
    /**
     * Specifies the type optionsData is.
     */
    public optionsDataType: 'array' | 'enum' | 'ts-enum';
    /**
     * Any additional options for the select field not auto generated.
     */
    public extraOptions?: SelectFieldOption[];
    /**
     * Specifies whether the extra options should be added to the prefixed or post fixed to the list.
     * true = prefix, false = postfix.
     */
    public prefixExtraOptions = true;
    /**
     * Selector for what value in the data object gets set to the form.
     * Default is 'object.id'
     */
    public valueSelector?: string;
    /**
     * Selector for what value in the data object gets used as display name in the list.
     * Default is 'object.name'
     */
    public displayNameSelector?: string;
    /**
     * OptionsData will be sorted against any filters added here.
     * The key selects what property in the options data should be used for comparison.
     * The value set must match whatever value is found with the key for the optionsdata to be included.
     */
    public filters?: { key: any, value: any }[] = [];

    /**
     * Value used for select fields where you can select between single and multiple values.
     */
    public selectType: 'single' | 'multiple' = 'single';

    /**
     * Custom function that recieves the generated SelectFieldOption[]
     * Ensure it returns the options with updated displayName
     */
    public modifyDisplayName: Function;

    // EXPERIMENTAL
    public optionsData$: Observable<any>;

    constructor(values: Partial<SelectField>) {
        super(values);
        Object.assign(this, values);
    }

    /**
     * Gets the SelectFieldOptions for the SelectField.
     */
    public getOptions(): SelectFieldOption[] {
        this.setDefaults();
        return this.addOptions(this.dataToOptions(this.filterOptionsData()));
    }

    /**
     * Adds any extra options to the current options.
     * @param currentOptions The current options produced from the optionsData.
     */
    private addOptions(currentOptions: SelectFieldOption[]) {
        if (this.prefixExtraOptions) {
            return this.extraOptions ? this.extraOptions.concat(currentOptions) : currentOptions;
        } else {
            return this.extraOptions ? currentOptions.concat(this.extraOptions) : currentOptions;
        }
    }

    /**
     * Filters the optionsdata against all filters added. If none is added, all options are returned.
     */
    private filterOptionsData(): SelectFieldOption[] {
        if (this.filters[0] && Array.isArray(this.optionsData)) {
            // Array filter logic
            return this.optionsData
                .map(data => this.filters
                    .map(filter => getProperty(data, filter.key) === filter.value ? data : undefined)
                    .filter(x => x)
                )
                .reduce((acc, current) => acc.concat(current));
        } else if (this.filters[0]) {
            // TODO: Implement enums filter logic. Also see TODO in FilterSelectionRule class.
        } else {
            // No filters; return all data.
            return this.optionsData;
        }
    }

    /**
     * Converts the options data from an array or enum into a SelectFieldOption e.g. { value: 23, displayName: 'Age' }
     * @param optionsData An array or enum
     */
    private dataToOptions(optionsData: any): SelectFieldOption[] {
        let options: SelectFieldOption[];

        switch (this.optionsDataType) {
            case 'array': options = FieldHelpers.getFieldOptionsOfArray(optionsData, this.valueSelector, this.displayNameSelector); break;
            case 'enum': options = FieldHelpers.getFieldOptionsOfEnum(optionsData); break;
            case 'ts-enum': options = FieldHelpers.getFieldOptionsOfEnum(optionsData, true); break;
            default: options = []; break;
        }

        return this.modifyDisplayName ? this.modifyDisplayName(options) : options;
    }

    /**
     * Helper method to set default values when getting options.
     */
    private setDefaults() {
        this.optionsDataType ? this.optionsDataType = this.optionsDataType : this.optionsDataType = 'array';
        this.valueSelector ? this.valueSelector = this.valueSelector : this.valueSelector = 'id';
        this.displayNameSelector ? this.displayNameSelector = this.displayNameSelector : this.displayNameSelector = 'name';
    }
}
