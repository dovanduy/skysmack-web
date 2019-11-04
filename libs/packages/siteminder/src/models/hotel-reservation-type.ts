import { ReservationStatus } from './reservation-status';
import { RoomStayType } from './room-stay-type';

export class HotelReservationType {
    public createDateTime: Date;
    public lastModifyDateTime: Date;
    public reservationStatus: ReservationStatus;
    public uniqueId: string;
    public messageId: string;
    public channel: string;
    public reservationIdType: string;
    public reservationIdValue: string;
    public currencyCode: string;
    public amount: number;
    public beforeTax: boolean;
    public roomStays: RoomStayType[];
}