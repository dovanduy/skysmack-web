export class DisplayColumn {
    public fieldKey: string;
    // TODO(GET_DEPS): Newly added. Is this still needed when get deps has been implemented?
    public fieldDisplayKey: string;
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
