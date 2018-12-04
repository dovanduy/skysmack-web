import { DocumentRecordEpicsBase, DocumentRecordRequests } from '@skysmack/redux';
import { LodgingType } from '../models/lodging-type';

export class LodgingTypesEpics extends DocumentRecordEpicsBase<LodgingType, number> {
    constructor(protected requests: DocumentRecordRequests<LodgingType, number>) {
        super(requests, 'LODGING_TYPES_');
    }
}