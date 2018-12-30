import { DocumentRecordEpicsBase, DocumentRecordRequests } from '@skysmack/redux';
import { Lodging } from '../models';

export class LodgingsEpics extends DocumentRecordEpicsBase<Lodging, number> {
    constructor(protected requests: DocumentRecordRequests<Lodging, number>) {
        super(requests, 'LODGINGS_');
    }
}