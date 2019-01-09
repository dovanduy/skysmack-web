import { RecordRequests, RecordEpicsBase } from '@skysmack/redux';
import { User } from '../models/user';

export class UsersEpics extends RecordEpicsBase<User, number> {
    constructor(protected requests: RecordRequests<User, number>) {
        super(requests, 'USERS_');
    }
}