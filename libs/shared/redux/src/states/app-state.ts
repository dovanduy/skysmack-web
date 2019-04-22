import { OfflineState } from '@redux-offline/redux-offline/lib/types';

export abstract class AppState {
    public offline?: OfflineState;
}
