import { Record } from '@skysmack/framework';

export class EmailTemplate extends Record<number> {
    public from: string;
    public to: string;
    public cc: string;
    public bcc: string;
    public subject: string;
    public body: string;
}