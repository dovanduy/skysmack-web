import { DocumentRecordEpicsBase, DocumentRecordRequests } from '@skysmack/redux';
import { ProductType } from './../models/product-type';

export class ProductTypesEpics extends DocumentRecordEpicsBase<ProductType, number> {
    constructor(protected requests: DocumentRecordRequests<ProductType, number>) {
        super(requests, 'PRODUCT_TYPES_');
    }
}