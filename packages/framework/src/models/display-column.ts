import { LocalObject } from './local-object';
import { getProperty } from '../helpers/framework.helpers';

export class DisplayColumn {
    public fieldKey: string;
    // TODO(GET_DEPS): Newly added. Is this still needed when get deps has been implemented?
    public fieldDisplayKey: string;

    public static count: number = 0;

    public displayModifier: Function;

    public getDisplay(entity: LocalObject<any, any>) {
        // DisplayColumn.count = DisplayColumn.count + 1;
        const key = this.fieldDisplayKey ? this.fieldDisplayKey : this.fieldKey;
        const displayValue = getProperty(entity, 'object.' + key, false);
        return this.displayModifier ? this.displayModifier(displayValue) : displayValue;
    }

    public show: boolean;

    public translationString: string;
    public dynamicFieldName: string;

    public type: 'string' | 'array<string>' | 'array<number>' | 'array<boolean>' | 'date' | 'number' | 'boolean' | 'undefined';

    public sortable: boolean;
    public sortOrder?: boolean;

    constructor(values: Partial<DisplayColumn>) {
        Object.assign(this, values);
    }
}
