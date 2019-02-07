export class ReducerRegistry {

    // Singleton pattern
    private static _instance: ReducerRegistry;
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public reducers: any;
    public emitChange: any;

    private constructor(initialReducers = {}) {
        this.reducers = { ...initialReducers };
        this.emitChange = null;
    }

    public register(name: string, reducer: Function) {
        this.reducers = { ...this.reducers, [name]: reducer };
        console.log(this.reducers);
        if (this.emitChange != null) {
            this.emitChange(this.getReducers());
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