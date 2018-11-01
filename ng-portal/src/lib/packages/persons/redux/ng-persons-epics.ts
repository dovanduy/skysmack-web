import { PersonsEpics } from '@skysmack/packages-persons';
import { Injectable } from '@angular/core';
import { PersonsRequests } from './persons-requests';

@Injectable({ providedIn: 'root' })
export class NgPersonsEpics extends PersonsEpics {
    constructor(personsRequests: PersonsRequests) {
        super(personsRequests);
    }
}
