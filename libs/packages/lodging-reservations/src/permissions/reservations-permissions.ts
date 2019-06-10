import { FIND, ADD, UPDATE, REMOVE } from '@skysmack/framework';

export class ReservationsPermissions {
    private reservations = 'Reservations';
    public findReservations = FIND + this.reservations;
    public addReservations = ADD + this.reservations;
    public updateReservations = UPDATE + this.reservations;
    public removeReservations = REMOVE + this.reservations;
}