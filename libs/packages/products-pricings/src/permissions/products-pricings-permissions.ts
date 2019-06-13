import { FIND, ADD, UPDATE, REMOVE } from '@skysmack/framework';

export class ProductsPricingsPermissions {
    private static productPriceChanges = 'ProductPriceChanges';
    private static productTypePriceChanges = 'ProductTypePriceChanges';
    
    private static productSalesPrices = 'ProductSalesPrices';
    private static productTypeSalesPrices = 'ProductTypeSalesPrices';

    public static findProductPriceChanges = FIND + ProductsPricingsPermissions.productPriceChanges;
    public static addProductPriceChanges = ADD + ProductsPricingsPermissions.productPriceChanges;
    public static updateProductPriceChanges = UPDATE + ProductsPricingsPermissions.productPriceChanges;
    public static removeProductPriceChanges = REMOVE + ProductsPricingsPermissions.productPriceChanges;

    public static findProductTypePriceChanges = FIND + ProductsPricingsPermissions.productTypePriceChanges;
    public static addProductTypePriceChanges = ADD + ProductsPricingsPermissions.productTypePriceChanges;
    public static updateProductTypePriceChanges = UPDATE + ProductsPricingsPermissions.productTypePriceChanges;
    public static removeProductTypePriceChanges = REMOVE + ProductsPricingsPermissions.productTypePriceChanges;


    public static findProductSalesPrices = FIND + ProductsPricingsPermissions.productSalesPrices;
    public static addProductSalesPrices = ADD + ProductsPricingsPermissions.productSalesPrices;
    public static updateProductSalesPrices = UPDATE + ProductsPricingsPermissions.productSalesPrices;
    public static removeProductSalesPrices = REMOVE + ProductsPricingsPermissions.productSalesPrices;

    public static findProductTypeSalesPrices= FIND + ProductsPricingsPermissions.productTypeSalesPrices;
    public static addProductTypeSalesPrices= ADD + ProductsPricingsPermissions.productTypeSalesPrices;
    public static updateProductTypeSalesPrices= UPDATE + ProductsPricingsPermissions.productTypeSalesPrices;
    public static removeProductTypeSalesPrices= REMOVE + ProductsPricingsPermissions.productTypeSalesPrices;
}