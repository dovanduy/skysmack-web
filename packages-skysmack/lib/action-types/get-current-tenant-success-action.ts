import { AnyAction } from 'redux';
import { CurrentTenantViewModel } from './../models/current-tenant';

export class GetCurrentTenantSuccessAction implements AnyAction {
    public type: any;
    public payload: CurrentTenantViewModel;

    public constructor(init?: Partial<GetCurrentTenantSuccessAction>) {
        Object.assign(this, init);
    }
}
