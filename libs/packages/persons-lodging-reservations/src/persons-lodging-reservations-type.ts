import { PackageType } from '@skysmack/framework';
import { PersonsType } from '@skysmack/packages-persons';
import { LodgingReservationsType } from '@skysmack/packages-lodging-reservations';

export class PersonsLodgingReservationsType implements PackageType {
    public static id = '0924b44c-974f-4dcf-9a0e-16ddfbe492a2';
    public id = PersonsLodgingReservationsType.id;
    dependencies = [
        PersonsType.id,
        LodgingReservationsType.id
    ];
}
