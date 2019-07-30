import { BehaviorSubject } from 'rxjs';
import { MenuProvider } from '../models/menu-provider';

export class MenuProviders {
    private providers: MenuProvider[] = [];
    public providers$: BehaviorSubject<MenuProvider[]> = new BehaviorSubject([]);
    private register = {};

    public add(provider: MenuProvider): MenuProviders {
        const registered = this.register[provider.id];
        if (!registered) {
            this.providers.push(provider);
            this.providers$.next(this.providers);
            this.register[provider.id] = provider.id;
        }

        return this;
    }
}
