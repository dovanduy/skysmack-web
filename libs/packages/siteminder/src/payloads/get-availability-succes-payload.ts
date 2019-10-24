import { LodgingTypeAvailability } from '../models/lodging-type-availability';

export class GetAvailabilitySuccessPayload {
    public packagePath: string;
    public start: Date;
    public end: Date;
    public entities: LodgingTypeAvailability[];

    constructor(init?: Partial<GetAvailabilitySuccessPayload>) {
        Object.assign(this, init);
    }
}