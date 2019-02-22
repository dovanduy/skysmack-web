export class DisplayColumn {
    public fieldKey: string;

    public translationString: string;
    public dynamic: boolean;

    public type: 'string' | 'array<string>' | 'array<number>' | 'array<boolean>' | 'date' | 'number' | 'boolean' | 'undefined';

    public sortable: boolean;
    public sortOrder?: boolean;
}
