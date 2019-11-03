import { Record, LocalObject } from "@skysmack/framework";
import { Phone } from './phone';

export class PhoneNumber extends Record<number> {
    public number: string;
    public internal: boolean;
    public phoneId: number;
    public phone: LocalObject<Phone, number>;

    public constructor(init?: Partial<PhoneNumber>) {
        super();
        Object.assign(this, init);
    }
}