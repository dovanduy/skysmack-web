import { NetInfo, Outbox } from '@redux-offline/redux-offline/lib/types';

// Copy of OfflineState in @redux-offline/redux-offline/lib/types
// It had problems with getting imported, so keeping a copy here.
export interface OfflineState {
    busy: boolean;
    lastTransaction: number;
    netInfo?: NetInfo;
    online: boolean;
    outbox: Outbox;
    retryCount: number;
    retryScheduled: boolean;
}