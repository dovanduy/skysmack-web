// @dynamic
export class ReducerRegistry {

    // Singleton pattern
    private static _instance: ReducerRegistry;
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    private reducers: any;
    private emitChange: any;

    private reducerNames = {};

    private constructor(initialReducers = {}) {
        this.reducers = { ...initialReducers };
        this.emitChange = null;
    }

    public register(name: string, reducer: Function) {
        if (!this.reducerNames[name]) {
            this.reducerNames[name] = name;
            this.reducers = { ...this.reducers, [name]: reducer };
            if (this.emitChange != null) {
                this.emitChange(this.getReducers());
            }
        }
    }

    public getReducers() {
        return { ...this.reducers };
    }

    public setChangeListener(listener) {
        if (this.emitChange != null) {
            throw new Error('Can only set the listener for a ReducerRegistry once.');
        }
        this.emitChange = listener;
    }
}
