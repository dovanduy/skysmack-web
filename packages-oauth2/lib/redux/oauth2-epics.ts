import { Epic } from 'redux-observable';
import { Oauth2Requests } from './oauth2-requests';

export class Oauth2Epics {
    public epics: Epic[];

    constructor(
        protected requests: Oauth2Requests,
    ) {
        this.epics = [];
    }
}
