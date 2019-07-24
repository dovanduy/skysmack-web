import { PackageType } from '@skysmack/framework';
import { LodgingReservationsTypeId } from './lodging-reservations-type';

export const ReservationsPricingsTypeId = '02ec5ad2-9f08-4702-aa93-fe8a5be34481';
export class ReservationsPricingsType implements PackageType {
    public id = ReservationsPricingsTypeId;
    dependencies = [LodgingReservationsTypeId];
}
