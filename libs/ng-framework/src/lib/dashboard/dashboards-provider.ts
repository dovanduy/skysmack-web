import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DashboardsProvider {
    public providers: any[] = [];
    public providers$: BehaviorSubject<any[]> = new BehaviorSubject([]);
    private register = {};

    public add(provider: any): DashboardsProvider {
        const registered = this.register[provider.id];
        if (!registered) {
            this.providers.push(provider);
            this.providers$.next(this.providers);
            this.register[provider.id] = provider.id;
        }

        return this;
    }
}
