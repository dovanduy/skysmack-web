import { Injectable } from '@angular/core';
import { FieldProvider } from './field-provider';
import { StrIndex } from '@skysmack/framework';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FieldProviders {
    public providers$: BehaviorSubject<StrIndex<FieldProvider[]>> = new BehaviorSubject({});

    private providers: StrIndex<FieldProvider[]> = {};
    private register = {};

    public add(type: string, fieldProvider: FieldProvider) {
        const registered = this.register[fieldProvider.id];
        if (!registered) {
            if (!this.providers[type]) {
                this.providers[type] = [];
                this.providers$.next(this.providers);
            }
            this.providers[type].push(fieldProvider);
            this.providers$.next(this.providers);
            this.register[fieldProvider.id] = fieldProvider.id;
        }
    }
}
