export class RemoveDialogData {
    public name: string;
    public removeMethod: () => void;
    
    constructor(values?: Partial<RemoveDialogData>) {
        Object.assign(this, values);
    }
}