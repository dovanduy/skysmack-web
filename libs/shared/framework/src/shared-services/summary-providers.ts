import { BehaviorSubject } from 'rxjs';
import { SummaryProvider } from '../models/summary-provider';

export class SummaryProviders {
    public providers: SummaryProvider[] = [];
    public providers$: BehaviorSubject<SummaryProvider[]> = new BehaviorSubject([]);
    private register = {};

    public add(provider: SummaryProvider): SummaryProviders {
        const registered = this.register[provider.id];
        if (!registered) {
            this.providers.push(provider);
            this.providers$.next(this.providers);
            this.register[provider.id] = provider.id;
        }

        return this;
    }
}
