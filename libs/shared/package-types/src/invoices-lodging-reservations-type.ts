import { PackageType } from '@skysmack/framework';
import { LodgingReservationsTypeId } from './lodging-reservations-type';
import { InvoicesTypeId } from './invoices-type';

export const InvoicesLodgingReservationsTypeId: string = '02ebc5fb-5459-45a2-a53c-ba83a3504aa2';

export class InvoicesLodgingReservationsType implements PackageType {
    public id = InvoicesLodgingReservationsTypeId;
    dependencies = [
        InvoicesTypeId,
        LodgingReservationsTypeId
    ];
}
