export interface SignalRProvider {
    name: string;
    messageProvided: (packagePath: string, message: any) => void;
}
