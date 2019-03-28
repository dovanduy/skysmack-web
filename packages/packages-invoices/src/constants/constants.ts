// Ensure area key is the same as the reducer name without the "Reducer" part.
export const INVOICES_AREA_KEY = 'invoices'; // validation, registerRedux, store, menu
export const INVOICES_REDUX_KEY = 'INVOICES_'; // reducer prefix, action, epics, Requests
export const INVOICES_ADDITIONAL_PATHS = []; // actions, requests

export const INVOICE_ITEMS_AREA_KEY = 'invoice_items'; // validation, registerRedux, store, menu
export const INVOICE_ITEMS_REDUX_KEY = 'INVOICE_ITEMS_'; // reducer prefix, action, epics, Requests
export const INVOICE_ITEMS_ADDITIONAL_PATHS = ['items']; // actions, requests

export const INVOICE_PAYMENTS_AREA_KEY = 'invoice_payments'; // validation, registerRedux, store, menu
export const INVOICE_PAYMENTS_REDUX_KEY = 'INVOICE_PAYMENTS_'; // reducer prefix, action, epics, Requests
export const INVOICE_PAYMENTS_ADDITIONAL_PATHS = ['payments']; // actions, requests