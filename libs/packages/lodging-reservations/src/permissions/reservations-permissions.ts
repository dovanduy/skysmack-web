import { FIND, ADD, UPDATE, REMOVE } from '@skysmack/framework';

export class ReservationsPermissions {
    private reservations = 'Reservations';
    public findReservations = FIND + this.reservations;
    public addReservations = ADD + this.reservations;
    public updateReservations = UPDATE + this.reservations;
    public removeReservations = REMOVE + this.reservations;

    public allocateLodging = 'AllocateLodging';
    public overbooking = 'Overbooking';
    public skipProcessingStatus = 'SkipProcessingStatus';

    public checkIn = 'CheckIn';
    public undoCheckIn = 'UndoCheckIn';

    public move = 'Move';
    public undoMove = 'UndoMove';

    public checkOut = 'CheckOut';
    public undoCheckOut = 'UndoCheckOut';

    public cancel = 'Cancel';
    public undoCancel = 'UndoCancel';

    public noShow = 'NoShow';
    public undoNoShow = 'UndoNoShow';
}