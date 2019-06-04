import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class InvoicesPermissions {
    private invoices = 'Invoices';
    private personFields = 'Invoice' + FIELDS;
    public findInvoices = FIND + this.invoices;
    public addInvoices = ADD + this.invoices;
    public updateInvoices = UPDATE + this.invoices;
    public removeInvoices = REMOVE + this.invoices;
    public findInvoicesFields = FIND + this.personFields;
    public addInvoicesFields = ADD + this.personFields;
    public updateInvoicesFields = UPDATE + this.personFields;
    public removeInvoicesFields = REMOVE + this.personFields;
}