import { LocalObject } from '@skysmack/framework';
import { Lodging } from './lodging';

export class DetailedLodging {
    public lodging: LocalObject<Lodging, number>;
    public available: boolean;

    public constructor(values?: Partial<DetailedLodging>) {
        Object.assign(this, values);
    }
}
