import { LodgingType } from '@skysmack/packages-lodgings';

/**
 * Only used for updating data.
 */
export class Availability {
    public start: Date;
    public end: Date
    public lodgingTypeId: number;
    public lodgingType: LodgingType;
    public available?: number;
    public availableModifier?: number;

    public constructor(init?: Partial<Availability>) {
        Object.assign(this, init);
    }
}