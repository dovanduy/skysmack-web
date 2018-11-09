export const linq = (collection: any[]): Linq => new Linq(collection);

class Linq {

    constructor(private collection: any[]) { }

    // MISSING
    // any()
    // first()
    // firstOrDefault


    /**
     * Returns defined values.
     */
    public defined(): Linq {
        this.collection = this.collection.filter(x => x !== undefined);
        return this;
    }

    /**
     * Returns an array of the selected property
     * @param selector Lamba function
     */
    public select(selector): Linq {
        this.collection = this.collection.map(selector);
        return this;
    }

    /**
     * Returns an array with the properties that passes the provided test
     * @param selector Lamba function
     */
    public where(selector): Linq {
        this.collection = this.collection.filter(selector);
        return this;
    }

    /**
     * Flattens an array of arrays into one array.
     */
    public selectMany(): Linq {
        if (this.collection.length > 0) {
            this.collection = this.collection.reduce((a, b) => a.concat(b));
        }
        return this;
    }

    /**
     * Returns distinct values.
     */
    public distinct(): Linq {
        this.collection = this.collection.filter((value, index, self) => self.indexOf(value) === index);
        return this;
    }

    /*
     * Logs the collection
     */
    public log(): Linq {
        console.log(this.collection);
        return this;
    }

    /**
     * Returns number of items in the collection. Stops chain.
     */
    public count(): number {
        return this.collection.length;
    }

    public ok(): any[] {
        return this.collection;
    }
}
