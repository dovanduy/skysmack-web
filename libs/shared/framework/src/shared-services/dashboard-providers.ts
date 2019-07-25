import { BehaviorSubject } from 'rxjs';
import { DashboardProvider } from './dashboard-provider';

export class DashboardProviders {
    public providers: DashboardProvider[] = [];
    public providers$: BehaviorSubject<DashboardProvider[]> = new BehaviorSubject([]);
    private register = {};

    public add(provider: DashboardProvider): DashboardProviders {
        const registered = this.register[provider.id];
        if (!registered) {
            this.providers.push(provider);
            this.providers$.next(this.providers);
            this.register[provider.id] = provider.id;
        }

        return this;
    }
}
