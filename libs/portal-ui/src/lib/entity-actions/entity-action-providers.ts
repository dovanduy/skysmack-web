import { Injectable } from '@angular/core';
import { StrIndex } from '@skysmack/framework';
import { BehaviorSubject } from 'rxjs';
import { EntityActionProvider } from './entity-action-provider';

@Injectable({ providedIn: 'root' })
export class EntityActionProviders {
    public providers: StrIndex<EntityActionProvider[]> = {};
    public providers$: BehaviorSubject<StrIndex<EntityActionProvider[]>> = new BehaviorSubject({});
    private register = {};

    public add(type: string, fp: EntityActionProvider) {
        const fpName = Object.getPrototypeOf(fp).constructor.name;
        const registered = this.register[fpName];
        if (!registered) {
            if (!this.providers[type]) {
                this.providers[type] = [];
                this.providers$.next(this.providers);
            }
            this.providers[type].push(fp);
            this.providers$.next(this.providers);
            this.register[fpName] = fpName;
        }
    }
}
