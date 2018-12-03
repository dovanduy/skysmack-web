import { LodgingTypes } from '../models/index';
import { DocumentRecordEpicsBase, DocumentRecordRequests } from '@skysmack/redux';

export class LodgingTypesEpics extends DocumentRecordEpicsBase<LodgingTypes, number> {
    constructor(protected requests: DocumentRecordRequests<LodgingTypes, number>) {
        super(requests, 'LODGING.TYPES_');
    }
}