import { Channel } from '@skysmack/packages-siteminder';
import { LocalObject } from '@skysmack/framework';

export class ChannelColumn {
    public id: number;
    public title: string;
    public channel: LocalObject<Channel, number>;

    constructor(init?: Partial<ChannelColumn>) {
        Object.assign(this, init);
    }
}