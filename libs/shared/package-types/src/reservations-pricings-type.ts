import { PackageType } from '@skysmack/framework';
import { LodgingReservationsType } from './lodging-reservations-type';

export class ReservationsPricingsType implements PackageType {
    public static id = '02ec5ad2-9f08-4702-aa93-fe8a5be34481';
    public id = ReservationsPricingsType.id;
    dependencies = [LodgingReservationsType.id];
}
