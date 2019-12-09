import { Record, LocalObject } from "@skysmack/framework";
import { Doorway } from '@skysmack/ng-doorways';
import { LodgingReservation } from '@skysmack/packages-lodging-reservations';

export class LodgingReservationPassCodeKey {
    public lodgingReservationId: number;
    public passCodeId: number;
}

export class LodgingReservationPassCode extends Record<LodgingReservationPassCodeKey> {
    public passCodeId: number;
    public passCode: LocalObject<Doorway, number>;
    public lodgingReservationId: number;
    public lodgingReservation: LocalObject<LodgingReservation, number>;

    public constructor(init?: Partial<LodgingReservationPassCode>) {
        super();
        Object.assign(this, init);
    }
}