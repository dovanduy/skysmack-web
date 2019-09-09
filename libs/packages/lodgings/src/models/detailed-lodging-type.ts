import { LocalObject } from '@skysmack/framework';
import { LodgingType } from './lodging-type';

export class DetailedLodgingType {
    public lodgingType: LocalObject<LodgingType, number>;
    public availableCount: number;
    public priceDetails: { packageName: string, currency: string, price: number }[];

    public constructor(values?: Partial<DetailedLodgingType>) {
        Object.assign(this, values);
    }
}
