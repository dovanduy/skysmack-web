import { StrIndex } from "../models";

export class SortBuilder {
    private sortDictionary: StrIndex<boolean> = {};

    public add(column: string, ascending: boolean = true) {
        this.remove(column);
        this.sortDictionary[column] = ascending;
    }

    public remove(column: string) {
        if (column in this.sortDictionary) {
            delete this.sortDictionary[column];
        }
    }

    public build() {
        let result = '';
        Object.keys(this.sortDictionary).reverse().forEach(key => result += `${this.sortDictionary[key] ? '' : '-'}${key},`);
        return result.substring(0, result.length - 1);
    }
}
