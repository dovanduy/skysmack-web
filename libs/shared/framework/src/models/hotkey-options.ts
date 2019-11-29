export interface HotKeyOptions {
    action: string | Function;
    keyCode: number;
    eventName: string;
    log: string;
    shiftKey: boolean;
    ctrlKey: boolean;
    altKey: boolean;
}