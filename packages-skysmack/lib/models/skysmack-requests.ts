import { Observable } from 'rxjs';

export interface SkysmackRequests {
    get(): Observable<any>
}
