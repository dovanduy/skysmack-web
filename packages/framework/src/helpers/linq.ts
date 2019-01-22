export const linq = <TValue>(collection: TValue[]): Linq<TValue> => new Linq(collection);

class Linq<TValue> {

    constructor(private collection: TValue[]) { }

    // MISSING
    // any()
    // first()
    // firstOrDefault


    /**
     * Returns defined values.
     */
    public defined(): Linq<TValue> {
        this.collection = this.collection.filter(x => x !== undefined && x !== null);
        return this;
    }

    /**
     * Returns an array of the selected property
     * @param selector Lamba function
     */
    public select<TReturn>(callbackfn: (value: TValue, index: number, array: TValue[]) => TReturn, thisArg?: any): Linq<TReturn> {
        return new Linq<TReturn>(this.collection.map<TReturn>(callbackfn));
    }

    /**
     * Returns an array with the properties that passes the provided test
     * @param selector Lamba function
     */
    public where(callbackfn: (value: TValue, index: number, array: TValue[]) => TValue, thisArg?: any): Linq<TValue> {
        this.collection = this.collection.filter(callbackfn);
        return this;
    }

    /**
     * Flattens an array of arrays into one array.
     */
    public selectMany(manyCollection: Linq<TValue[]>): Linq<TValue> {
        if (manyCollection.collection.length > 0) {
            this.collection = manyCollection.collection.reduce((a, b) => a.concat(b));
        }

        if (this.collection === undefined) {
            this.collection = [];
        }
        return this;
    }

    /**
     * Returns distinct values.
     */
    public distinct(): Linq<TValue> {
        this.collection = this.collection.filter((value, index, self) => self.indexOf(value) === index);
        return this;
    }

    /*
     * Logs the collection
     */
    public log(): Linq<TValue> {
        console.log(this.collection);
        return this;
    }

    /**
     * Returns number of items in the collection. Stops chain.
     */
    public count(): number {
        return this.collection.length;
    }

    public ok(): TValue[] {
        return this.collection;
    }
}
