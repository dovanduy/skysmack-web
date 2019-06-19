export interface SignalRProvider {
    name: string;
    messageProvided: (message: any) => void;
}
