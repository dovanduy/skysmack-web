import { Record } from '@skysmack/framework';

export class Channel extends Record<number> {
    public name: string;

    public constructor(init?: Partial<Channel>) {
        super(init);
    }
}