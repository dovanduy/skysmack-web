import { MenuItemProvider } from './menu-item-provider';
import { BehaviorSubject } from 'rxjs';

export class MenuItemProviders {
    private providers: MenuItemProvider[] = [];
    public providers$: BehaviorSubject<MenuItemProvider[]> = new BehaviorSubject([]);
    private register = {};

    public add(provider: MenuItemProvider): MenuItemProviders {
        const registered = this.register[provider.id];
        if (!registered) {
            this.providers.push(provider);
            this.providers$.next(this.providers);
            this.register[provider.id] = provider.id;
        }

        return this;
    }
}
