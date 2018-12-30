import { AnyAction } from 'redux';

export class ReduxAction<TPayload = unknown, TMeta = unknown> implements AnyAction {
    public type: string;
    public payload?: TPayload;
    public meta?: TMeta;
    public error?: boolean;

    constructor(init?: Partial<ReduxAction<TPayload, TMeta>>) {
        Object.assign(this, init);
    }
}