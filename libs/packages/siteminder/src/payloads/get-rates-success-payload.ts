import { LodgingTypeRate } from '../models';

export class GetRatesSuccessPayload {
    public packagePath: string;
    public start: Date;
    public end: Date;
    public entities: LodgingTypeRate[];

    public constructor(init?: Partial<GetRatesSuccessPayload>) {
        Object.assign(this, init);
    }
}