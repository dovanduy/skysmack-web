import { Record } from '@skysmack/framework';

export class Checkout extends Record<number> {
    public reservationId: number;
    public lodgingId?: number;

    constructor(init?: Partial<Checkout>) {
        super();
        Object.assign(this, init);
    }
}