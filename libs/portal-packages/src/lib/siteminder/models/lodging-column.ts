import { RateplanColumn } from './rateplan-column';

export class LodgingColumn {
    public id: number;
    public title: string;

    public rateplans: RateplanColumn[];
    
    public getRateChannelSize(): number {
        return this.rateplans.map(rateplan => rateplan.channels.length).reduce((a, b) => a + b, 0);
    }

    constructor(init?: Partial<LodgingColumn>) {
        Object.assign(this, init);
    }
}