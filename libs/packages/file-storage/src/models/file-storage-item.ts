export class FileStorageItem {
    public contentType?: string;
    public mediaLink: string;
    public name: string;
    public selfLink: string;

    constructor(values?: Partial<FileStorageItem>) {
        Object.assign(this, values);
    }
}