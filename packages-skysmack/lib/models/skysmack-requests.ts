import { Observable } from 'rxjs';
import { GetSkysmackSuccessAction } from '../action-types/get-skysmack-success-action';

export interface SkysmackRequests {
    get(): Observable<GetSkysmackSuccessAction>
}
