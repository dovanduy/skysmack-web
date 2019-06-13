import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class ProductsPermissions {
    private static products = 'Products';
    private static productTypes = 'ProductType';

    private static productFields = 'Person' + FIELDS;
    private static productTypeFields = 'PersonType' + FIELDS;

    public static findProducts = FIND + ProductsPermissions.products;
    public static addProducts = ADD + ProductsPermissions.products;
    public static updateProducts = UPDATE + ProductsPermissions.products;
    public static removeProducts = REMOVE + ProductsPermissions.products;
    
    public static findProductsFields = FIND + ProductsPermissions.productFields;
    public static addProductsFields = ADD + ProductsPermissions.productFields;
    public static updateProductsFields = UPDATE + ProductsPermissions.productFields;
    public static removeProductsFields = REMOVE + ProductsPermissions.productFields;

    public static findProductTypes = FIND + ProductsPermissions.productTypes;
    public static addProductTypes = ADD + ProductsPermissions.productTypes;
    public static updateProductTypes = UPDATE + ProductsPermissions.productTypes;
    public static removeProductTypes = REMOVE + ProductsPermissions.productTypes;
    
    public static findProductTypeFields = FIND + ProductsPermissions.productTypeFields;
    public static addProductTypeFields = ADD + ProductsPermissions.productTypeFields;
    public static updateProductTypeFields = UPDATE + ProductsPermissions.productTypeFields;
    public static removeProductTypeFields = REMOVE + ProductsPermissions.productTypeFields;
}