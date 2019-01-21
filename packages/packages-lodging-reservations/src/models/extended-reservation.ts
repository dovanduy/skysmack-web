import { LocalObject } from '@skysmack/framework';
import { LodgingReservation } from './lodging-reservation';
import { Lodging, LodgingType } from '@skysmack/packages-lodgings';
import * as _moment from 'moment';
const moment = _moment;

export class ExtendedReservation {
    public id: number;
    public lodgingName: string;
    public lodgingTypeName: string;
    public persons: number;
    public checkIn: string;
    public checkOut: string;

    constructor(
        public reservation: LocalObject<LodgingReservation, number>,
        public lodging: LocalObject<Lodging, number>,
        public lodgingType: LocalObject<LodgingType, number>,
    ) {
        if (reservation && reservation.object) {
            this.id = reservation.object.id;
            this.persons = reservation.object.persons;
            this.checkIn = moment(reservation.object.checkIn).format('DD-MM-YYYY');
            this.checkOut = moment(reservation.object.checkOut).format('DD-MM-YYYY');
        }
        this.lodgingName = lodging ? lodging.object.name : '';
        this.lodgingTypeName = lodgingType ? lodgingType.object.name : '';
    }
}
