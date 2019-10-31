import { Record, LocalObject } from "@skysmack/framework";
import { Phone } from './phone';

/**
 * Equals backend LogViewModel
 */
export class PhoneLog extends Record<number> {
    public sourceNumber: string;
    public destinationNumber: string;
    public started: Date; // LocalDate
    public connected: Date; // LocalDate
    public ended: Date; // LocalDate
    public terminatedBySource: Boolean;
    public sourcePhoneId?: number;
    public sourcePhone: LocalObject<Phone, number>;
    public destinationPhoneId?: number;
    public destinationPhone: LocalObject<Phone, number>;

    public constructor(init?: Partial<PhoneLog>) {
        super();
        Object.assign(this, init);
    }
}