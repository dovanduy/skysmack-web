import { Injectable } from '@angular/core';
import { FieldProvider } from './field-provider';
import { StrIndex } from '@skysmack/framework';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FieldProviders {
    public providers: StrIndex<FieldProvider[]> = {};
    public providers$: BehaviorSubject<StrIndex<FieldProvider[]>> = new BehaviorSubject({});
    private register = {};

    public add(type: string, fp: FieldProvider) {
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
