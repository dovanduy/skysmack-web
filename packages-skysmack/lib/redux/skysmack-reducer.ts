import { CurrentTenantViewModel } from './../models/current-tenant';

export class SkysmackState {
    currentTenant: CurrentTenantViewModel
    tenantLoaded: boolean;
    packages: any[];
}

const SKYSMACK_STATE: SkysmackState = {
    currentTenant: {},
    tenantLoaded: false,
    packages: []
}

export function skysmackReducer(state = SKYSMACK_STATE, action) {
    switch (action.type) {
        case 'GET_CURRENT_TENANT_SUCCESS':
            return {
                ...state,
                currentTenant: action.payload,
                tenantLoaded: true,
                packages: [
                    ...action.payload.packages,
                    ...action.payload.features,
                    ...action.payload.adaptors
                ]
            }
        default:
            return state;
    }
}
