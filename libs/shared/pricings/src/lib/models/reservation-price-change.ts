import { PriceChange } from './price-change';

export class ReservationPriceChange extends PriceChange {
    public minUnitsOfTime: number;
    public maxUnitsOfTime: number;
    public onlyValidUnitsOfTime: boolean;
    public perUnitOfTime: boolean;
    public start: Date;
    public end: Date;
    public excludeDaysOfWeek: number;
}
