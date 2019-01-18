import { Record } from '@skysmack/framework';

export class Stay extends Record<number> {
    public id: number;
    public lodgingId: number;
    public reservationId: number;
    public start: Date;
    public date: Date;

    public constructor(init?: Partial<Stay>) {
        super();
        Object.assign(this, init);
    }
}