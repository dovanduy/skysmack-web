export class DisplayColumn {
    public fieldKey: string;
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
