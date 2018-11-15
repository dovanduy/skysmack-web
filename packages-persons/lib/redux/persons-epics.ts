import { Person } from '../models/index';
import { RecordEpicsBase, RecordRequests } from '@skysmack/redux';

export class PersonsEpics extends RecordEpicsBase<Person, number> {
    protected prefix = 'PERSONS_';
    constructor(protected requests: RecordRequests<Person, number>) {
        super(requests);
    }
}