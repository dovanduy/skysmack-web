import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class ReservationsPermissions {
    private static reservations = 'Reservations';
    private static groupReservations = 'GroupReservations';
    private static groupReservationsFields = 'GroupReservations' + FIELDS;
    private static reservationsFields = 'Reservation' + FIELDS;

    public static findReservations = FIND + ReservationsPermissions.reservations;
    public static addReservations = ADD + ReservationsPermissions.reservations;
    public static updateReservations = UPDATE + ReservationsPermissions.reservations;
    public static removeReservations = REMOVE + ReservationsPermissions.reservations;

    public static allocateLodging = 'AllocateLodging';
    public static overbooking = 'Overbooking';
    public static skipProcessingStatus = 'SkipProcessingStatus';
    public static changeCheckInOut = 'ChangeCheckInOut';
    

    public static findReservationsFields = FIND + ReservationsPermissions.reservationsFields;
    public static addReservationsFields = ADD + ReservationsPermissions.reservationsFields;
    public static updateReservationsFields = UPDATE + ReservationsPermissions.reservationsFields;
    public static removeReservationsFields = REMOVE + ReservationsPermissions.reservationsFields;


    public static checkIn = 'CheckIn';
    public static undoCheckIn = 'UndoCheckIn';

    public static move = 'Move';
    public static undoMove = 'UndoMove';

    public static checkOut = 'CheckOut';
    public static undoCheckOut = 'UndoCheckOut';

    public static cancel = 'Cancel';
    public static undoCancel = 'UndoCancel';

    public static noShow = 'NoShow';
    public static undoNoShow = 'UndoNoShow';

    //#region Group permissions
    public static findGroupReservations = FIND + ReservationsPermissions.groupReservations;
    public static addGroupReservations = ADD + ReservationsPermissions.groupReservations;
    public static updateGroupReservations = UPDATE + ReservationsPermissions.groupReservations;
    public static removeGroupReservations = REMOVE + ReservationsPermissions.groupReservations;

    public static findGroupReservationsFields = FIND + ReservationsPermissions.groupReservationsFields;
    public static addGroupReservationsFields = ADD + ReservationsPermissions.groupReservationsFields;
    public static updateGroupReservationsFields = UPDATE + ReservationsPermissions.groupReservationsFields;
    public static removeGroupReservationsFields = REMOVE + ReservationsPermissions.groupReservationsFields;
    //#endregion
}