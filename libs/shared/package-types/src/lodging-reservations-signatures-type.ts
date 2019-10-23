import { PackageType } from '@skysmack/framework';
import { LodgingReservationsTypeId } from './lodging-reservations-type';


export const LodgingReservationsSignaturesTypeId = 'dec0e7ba-40a7-41e1-8a79-ad55e6513aa3';

export class LodgingReservationsSignaturesType implements PackageType {
    public id = LodgingReservationsSignaturesTypeId;
    dependencies = [LodgingReservationsTypeId];
}
