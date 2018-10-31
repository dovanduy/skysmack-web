import { Record } from "./record";

export interface DocumentRecord<TKey> extends Record<TKey> {
    [key: string]: any | any;
}