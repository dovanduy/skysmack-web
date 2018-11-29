import { ProductTypes } from '../models/index';
import { DocumentRecordEpicsBase, DocumentRecordRequests } from '@skysmack/redux';

export class ProductTypesEpics extends DocumentRecordEpicsBase<ProductTypes, number> {
    constructor(protected requests: DocumentRecordRequests<ProductTypes, number>) {
        super(requests, 'PRODUCT.TYPES_');
    }
}