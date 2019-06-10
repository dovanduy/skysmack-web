import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class InvoicesPermissions {
    private invoices = 'Invoices';
    private ownInvoices = 'OwnInvoices';

    private invoiceFields = 'Invoice' + FIELDS;

    private invoicesPayments = 'InvoicesPayments';
    private invoicesPaymentFields = 'InvoicesPayment' + FIELDS;

    private invoiceItems = 'InvoiceItems';
    private invoiceItemFields = 'InvoiceItem' + FIELDS;

    public findInvoices = FIND + this.invoices;
    public addInvoices = ADD + this.invoices;
    public updateInvoices = UPDATE + this.invoices;
    public removeInvoices = REMOVE + this.invoices;

    public findOwnInvoices = FIND + this.ownInvoices;
    public addOwnInvoices = ADD + this.ownInvoices;
    public updateOwnInvoices = UPDATE + this.ownInvoices;
    public removeOwnInvoices = REMOVE + this.ownInvoices;

    public findInvoicesFields = FIND + this.invoiceFields;
    public addInvoicesFields = ADD + this.invoiceFields;
    public updateInvoicesFields = UPDATE + this.invoiceFields;
    public removeInvoicesFields = REMOVE + this.invoiceFields;

    public findInvoicePayments = FIND + this.invoicesPayments;
    public addInvoicePayments = ADD + this.invoicesPayments;
    public updateInvoicePayments = UPDATE + this.invoicesPayments;
    public removeInvoicePayments = REMOVE + this.invoicesPayments;

    public findInvoicePaymentFields = FIND + this.invoicesPaymentFields;
    public addInvoicePaymentFields = ADD + this.invoicesPaymentFields;
    public updateInvoicePaymentFields = UPDATE + this.invoicesPaymentFields;
    public removeInvoicePaymentFields = REMOVE + this.invoicesPaymentFields;

    public findInvoiceItems = FIND + this.invoiceItems;
    public addInvoiceItems = ADD + this.invoiceItems
    public updateInvoiceItems = UPDATE + this.invoiceItems;
    public removeInvoiceItems = REMOVE + this.invoiceItems;

    public findInvoiceItemFields = FIND + this.invoiceItemFields;
    public addInvoiceItemFields = ADD + this.invoiceItemFields
    public updateInvoiceItemFields = UPDATE + this.invoiceItemFields;
    public removeInvoiceItemFields = REMOVE + this.invoiceItemFields;
}