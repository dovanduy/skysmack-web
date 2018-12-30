export abstract class Identifiable<TKey> {
    public abstract get identifier(): TKey;
    public abstract set identifier(v: TKey);
}   
