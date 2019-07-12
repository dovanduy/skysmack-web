export interface ClientOnlineStatusMessage {
    type: 'ClientOnlineChanged';
    clientId: number
    online: boolean;
}
