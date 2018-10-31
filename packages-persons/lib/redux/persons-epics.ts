import { Person } from '../models/index';
import { RecordEpicsBase } from '@skysmack/redux';

export class PersonsEpics extends RecordEpicsBase<Person, number> {
    protected prefix: 'persons';
}