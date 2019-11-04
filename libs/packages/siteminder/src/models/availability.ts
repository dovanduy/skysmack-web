import { LodgingType } from '@skysmack/packages-lodgings';

/**
 * Only used for updating data.
 */
export class Availability {
    public start: string;
    public end: string;
    public lodgingTypeId: number;
    public lodgingType: LodgingType;
    public available?: number;
    public availableModifier?: number;

    public constructor(init?: Partial<Availability>) {
        Object.assign(this, init);
    }
}