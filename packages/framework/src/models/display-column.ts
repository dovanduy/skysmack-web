import { LocalObject } from './local-object';
import { getProperty } from '../helpers/framework.helpers';

export class DisplayColumn {
    public fieldKey: string;
    // TODO(GET_DEPS): Newly added. Is this still needed when get deps has been implemented?
    public fieldDisplayKey: string;
    public fieldDisplaySubKey: string;

    public static count: number = 0;

    public displayModifier: Function;

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
