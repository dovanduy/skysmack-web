import { Person } from '../models/index';
import { DocumentRecordEpicsBase, DocumentRecordRequests } from '@skysmack/redux';

export class PersonsEpics extends DocumentRecordEpicsBase<Person, number> {
    constructor(protected requests: DocumentRecordRequests<Person, number>) {
        super(requests, 'PERSONS_');
    }
}