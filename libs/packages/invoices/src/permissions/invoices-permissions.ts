import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class InvoicesPermissions {
    private static invoices = 'Invoices';
    private static ownInvoices = 'OwnInvoices';

    private static invoiceFields = 'Invoice' + FIELDS;

    private static invoicesPayments = 'InvoicesPayments';
    private static invoicesPaymentFields = 'InvoicesPayment' + FIELDS;

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

    public static findInvoicesFields = FIND + InvoicesPermissions.invoiceFields;
    public static addInvoicesFields = ADD + InvoicesPermissions.invoiceFields;
    public static updateInvoicesFields = UPDATE + InvoicesPermissions.invoiceFields;
    public static removeInvoicesFields = REMOVE + InvoicesPermissions.invoiceFields;

    public static findInvoicePayments = FIND + InvoicesPermissions.invoicesPayments;
    public static addInvoicePayments = ADD + InvoicesPermissions.invoicesPayments;
    public static updateInvoicePayments = UPDATE + InvoicesPermissions.invoicesPayments;
    public static removeInvoicePayments = REMOVE + InvoicesPermissions.invoicesPayments;

    public static findInvoicePaymentFields = FIND + InvoicesPermissions.invoicesPaymentFields;
    public static addInvoicePaymentFields = ADD + InvoicesPermissions.invoicesPaymentFields;
    public static updateInvoicePaymentFields = UPDATE + InvoicesPermissions.invoicesPaymentFields;
    public static removeInvoicePaymentFields = REMOVE + InvoicesPermissions.invoicesPaymentFields;

    public static findInvoiceItems = FIND + InvoicesPermissions.invoiceItems;
    public static addInvoiceItems = ADD + InvoicesPermissions.invoiceItems
    public static updateInvoiceItems = UPDATE + InvoicesPermissions.invoiceItems;
    public static removeInvoiceItems = REMOVE + InvoicesPermissions.invoiceItems;

    public static findInvoiceItemFields = FIND + InvoicesPermissions.invoiceItemFields;
    public static addInvoiceItemFields = ADD + InvoicesPermissions.invoiceItemFields
    public static updateInvoiceItemFields = UPDATE + InvoicesPermissions.invoiceItemFields;
    public static removeInvoiceItemFields = REMOVE + InvoicesPermissions.invoiceItemFields;
}