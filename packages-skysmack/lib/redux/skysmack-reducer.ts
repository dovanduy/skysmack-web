import { CurrentTenantViewModel } from 'lib/models';

export class SkysmackState {
    currentTenant: CurrentTenantViewModel
}

const SKYSMACK_STATE: SkysmackState = {
    currentTenant: {}
}

export function skysmackReducer(state = SKYSMACK_STATE, action) {
    switch (action.type) {
        case 'GET_CURRENT_TENANT_SUCCESS':
            return {
                ...state,
                currentTenant: action.payload
            }
        default:
            return state;
    }
}
