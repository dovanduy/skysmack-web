import { CurrentTenantViewModel } from './../models/current-tenant';

export class SkysmackState {
    currentTenant: CurrentTenantViewModel
    tenantLoaded: boolean;
}

const SKYSMACK_STATE: SkysmackState = {
    currentTenant: {},
    tenantLoaded: false
}

export function skysmackReducer(state = SKYSMACK_STATE, action) {
    switch (action.type) {
        case 'GET_CURRENT_TENANT_SUCCESS':
            return {
                ...state,
                currentTenant: action.payload,
                tenantLoaded: true
            }
        default:
            return state;
    }
}
