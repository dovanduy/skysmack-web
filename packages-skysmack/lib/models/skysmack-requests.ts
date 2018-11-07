import { Observable } from 'rxjs';
import { GetCurrentTenantSuccessAction } from '../action-types/get-current-tenant-success-action';

export interface SkysmackRequests {
    get(): Observable<GetCurrentTenantSuccessAction>
}
