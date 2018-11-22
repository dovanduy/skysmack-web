# Unsubscribe observables

See the word "subscribe()" in you .ts file? Remember to unsubscribe!

## When you have "extends BaseComponent"
Use `this.subscribe(stream$.subscribe());`

## When you don't have "extends BaseComponent"
- Implement OnDestroy interface
- Add the prop
    - `public subscription: SubscriptionLike;`
- Add the subscription
    - `this.subscription = stream$.subscribe()`
- Unsubscribe on destroy
    ```ts
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    ```

## Also
`take()` and `takeWhile()` also unsubscribes the stream.