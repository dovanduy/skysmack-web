import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class InvoicesPermissions {
    private static invoices = 'Invoices';
    private static ownInvoices = 'OwnInvoices';

    private static invoiceFields = 'Invoice' + FIELDS;

    private static invoicePayments = 'InvoicePayments';
    private static invoicePaymentFields = 'InvoicePayment' + FIELDS;

    private static invoiceItems = 'InvoiceItems';
    private static invoiceItemFields = 'InvoiceItem' + FIELDS;

    public static findInvoices = FIND + InvoicesPermissions.invoices;
    public static addInvoices = ADD + InvoicesPermissions.invoices;
    public static updateInvoices = UPDATE + InvoicesPermissions.invoices;
    public static removeInvoices = REMOVE + InvoicesPermissions.invoices;

    public static findOwnInvoices = FIND + InvoicesPermissions.ownInvoices;
    public static addOwnInvoices = ADD + InvoicesPermissions.ownInvoices;
    public static updateOwnInvoices = UPDATE + InvoicesPermissions.ownInvoices;
    public static removeOwnInvoices = REMOVE + InvoicesPermissions.ownInvoices;

    public static findInvoiceFields = FIND + InvoicesPermissions.invoiceFields;
    public static addInvoiceFields = ADD + InvoicesPermissions.invoiceFields;
    public static updateInvoiceFields = UPDATE + InvoicesPermissions.invoiceFields;
    public static removeInvoiceFields = REMOVE + InvoicesPermissions.invoiceFields;

    public static findInvoicePayments = FIND + InvoicesPermissions.invoicePayments;
    public static addInvoicePayments = ADD + InvoicesPermissions.invoicePayments;
    public static updateInvoicePayments = UPDATE + InvoicesPermissions.invoicePayments;
    public static removeInvoicePayments = REMOVE + InvoicesPermissions.invoicePayments;

    public static findInvoicePaymentFields = FIND + InvoicesPermissions.invoicePaymentFields;
    public static addInvoicePaymentFields = ADD + InvoicesPermissions.invoicePaymentFields;
    public static updateInvoicePaymentFields = UPDATE + InvoicesPermissions.invoicePaymentFields;
    public static removeInvoicePaymentFields = REMOVE + InvoicesPermissions.invoicePaymentFields;

    public static findInvoiceItems = FIND + InvoicesPermissions.invoiceItems;
    public static addInvoiceItems = ADD + InvoicesPermissions.invoiceItems
    public static updateInvoiceItems = UPDATE + InvoicesPermissions.invoiceItems;
    public static removeInvoiceItems = REMOVE + InvoicesPermissions.invoiceItems;

    public static findInvoiceItemFields = FIND + InvoicesPermissions.invoiceItemFields;
    public static addInvoiceItemFields = ADD + InvoicesPermissions.invoiceItemFields
    public static updateInvoiceItemFields = UPDATE + InvoicesPermissions.invoiceItemFields;
    public static removeInvoiceItemFields = REMOVE + InvoicesPermissions.invoiceItemFields;
}