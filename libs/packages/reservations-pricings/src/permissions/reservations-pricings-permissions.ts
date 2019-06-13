import { FIND, ADD, UPDATE, REMOVE } from '@skysmack/framework';

export class ReservationsPricingsPermissions {
    private static lodgingPriceChanges = 'LodgingPriceChanges';
    private static lodgingTypePriceChanges = 'LodgingTypePriceChanges';
    
    private static lodgingSalesPrices = 'LodgingSalesPrices';
    private static lodgingTypeSalesPrices = 'LodgingTypeSalesPrices';

    public static findLodgingPriceChanges = FIND + ReservationsPricingsPermissions.lodgingPriceChanges;
    public static addLodgingPriceChanges = ADD + ReservationsPricingsPermissions.lodgingPriceChanges;
    public static updateLodgingPriceChanges = UPDATE + ReservationsPricingsPermissions.lodgingPriceChanges;
    public static removeLodgingPriceChanges = REMOVE + ReservationsPricingsPermissions.lodgingPriceChanges;

    public static findLodgingTypePriceChanges = FIND + ReservationsPricingsPermissions.lodgingTypePriceChanges;
    public static addLodgingTypePriceChanges = ADD + ReservationsPricingsPermissions.lodgingTypePriceChanges;
    public static updateLodgingTypePriceChanges = UPDATE + ReservationsPricingsPermissions.lodgingTypePriceChanges;
    public static removeLodgingTypePriceChanges = REMOVE + ReservationsPricingsPermissions.lodgingTypePriceChanges;


    public static findLodgingSalesPrices = FIND + ReservationsPricingsPermissions.lodgingSalesPrices;
    public static addLodgingSalesPrices = ADD + ReservationsPricingsPermissions.lodgingSalesPrices;
    public static updateLodgingSalesPrices = UPDATE + ReservationsPricingsPermissions.lodgingSalesPrices;
    public static removeLodgingSalesPrices = REMOVE + ReservationsPricingsPermissions.lodgingSalesPrices;

    public static findLodgingTypeSalesPrices= FIND + ReservationsPricingsPermissions.lodgingTypeSalesPrices;
    public static addLodgingTypeSalesPrices= ADD + ReservationsPricingsPermissions.lodgingTypeSalesPrices;
    public static updateLodgingTypeSalesPrices= UPDATE + ReservationsPricingsPermissions.lodgingTypeSalesPrices;
    public static removeLodgingTypeSalesPrices= REMOVE + ReservationsPricingsPermissions.lodgingTypeSalesPrices;
}