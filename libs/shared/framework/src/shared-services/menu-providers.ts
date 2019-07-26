import { BehaviorSubject } from 'rxjs';

export class MenuProviders {
    private providers: any[] = [];
    public providers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
    private register = {};

    public add(provider: any): MenuProviders {
        const registered = this.register[provider.id];
        if (!registered) {
            this.providers.push(provider);
            this.providers$.next(this.providers);
            this.register[provider.id] = provider.id;
        }

        return this;
    }
}
