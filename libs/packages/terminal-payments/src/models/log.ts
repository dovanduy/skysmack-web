import { Record } from '@skysmack/framework';

export class Log extends Record<number> {
    public error: number;
    public content: string;
    public clientId: string;
    public terminalId: number;
}
