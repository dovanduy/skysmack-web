import { LodgingType } from '@skysmack/packages-lodgings';
import { LocalObject } from '@skysmack/framework';

export class Availability {
    public start: Date;
    public end: Date
    public lodgingTypeId: number;
    public lodgingType: LocalObject<LodgingType, number>;
    public available?: number;
    public availableModifier?: number;

    public constructor(init?: Partial<Availability>) {
        Object.assign(this, init);
    }
}