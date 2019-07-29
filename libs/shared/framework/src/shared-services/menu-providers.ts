import { BehaviorSubject } from 'rxjs';

export class MenuProviders {
    private providers: any[] = []; // Type is SidebarMenu from portal-ui.
    public providers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
    private register = {};

    public add(provider: any): MenuProviders {
        if (!provider.id) {
            throw new Error(`\n\nPlease add an id with a unique value for provided menu with translationPrefix ${provider.translationPrefix}.\n`)
        }

        const registered = this.register[provider.id];
        if (!registered) {
            this.providers.push(provider);
            this.providers$.next(this.providers);
            this.register[provider.id] = provider.id;
        }

        return this;
    }
}
