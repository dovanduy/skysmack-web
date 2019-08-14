export class RemoveDialogData {
    public name: string;
    public removeMethod: Function;
    
    constructor(values?: Partial<RemoveDialogData>) {
        Object.assign(this, values);
    }
}