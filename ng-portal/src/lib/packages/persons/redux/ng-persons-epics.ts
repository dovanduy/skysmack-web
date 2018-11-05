import { PersonsEpics } from '@skysmack/packages-persons';
import { PersonsRequests } from './persons-requests';

export class NgPersonsEpics extends PersonsEpics {
    constructor(personsRequests: PersonsRequests) {
        super(personsRequests);
    }
}
