import { PackageType } from '@skysmack/framework';

export const LodgingReservationsTypeId = '80d31d3c-aeb0-4570-8f1d-12f1be6a6710';

export class LodgingReservationsType implements PackageType {
    public id = LodgingReservationsTypeId;
    dependencies = [];
}
