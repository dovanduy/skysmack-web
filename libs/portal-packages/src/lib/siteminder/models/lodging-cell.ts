import { RateplanCell } from './rateplan-cell';

export class LodgingCell {
    public lodgingId: number;

    // Availability
    public available: number;
    public modifier: number;

    public rateplans: RateplanCell[];

    constructor(init?: Partial<LodgingCell>) {
        Object.assign(this, init);
    }
}