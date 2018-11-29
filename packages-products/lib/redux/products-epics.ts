import { Product } from '../models/index';
import { DocumentRecordEpicsBase, DocumentRecordRequests } from '@skysmack/redux';

export class ProductsEpics extends DocumentRecordEpicsBase<Product, number> {
    constructor(protected requests: DocumentRecordRequests<Product, number>) {
        super(requests, 'PRODUCTS_');
    }
}