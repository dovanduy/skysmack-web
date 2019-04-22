import { MenuItemProvider } from './menu-item-provider';
import { BehaviorSubject } from 'rxjs';

export class MenuItemProviders {
    private providers: MenuItemProvider[] = [];
    public providers$: BehaviorSubject<MenuItemProvider[]> = new BehaviorSubject([]);
    private register = {};

    public add(provider: MenuItemProvider): MenuItemProviders {
        const fpName = Object.getPrototypeOf(provider).constructor.name;
        const registered = this.register[fpName];
        if (!registered) {
            this.providers.push(provider);
            this.providers$.next(this.providers);
            this.register[fpName] = fpName;
        }

        return this;
    }
}
