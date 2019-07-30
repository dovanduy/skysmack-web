import { PackageType } from '@skysmack/framework';
import { PersonsTypeId } from './persons-type';
import { LodgingReservationsTypeId } from './lodging-reservations-type';

export const PersonsLodgingReservationsTypeId: string = '0924b44c-974f-4dcf-9a0e-16ddfbe492a2';

export class PersonsLodgingReservationsType implements PackageType {
    public id = PersonsLodgingReservationsTypeId;
    dependencies = [
        PersonsTypeId,
        LodgingReservationsTypeId
    ];
}
