import { Observable } from 'rxjs';
import { GetPackagesSuccessPayload } from 'lib/payloads';
import { ReduxAction } from '@skysmack/redux';

export interface PackagesRequests {
    get(action: ReduxAction): Observable<ReduxAction<GetPackagesSuccessPayload>>;
    getSingle(action: ReduxAction): Observable<ReduxAction<GetPackagesSuccessPayload>>
}
