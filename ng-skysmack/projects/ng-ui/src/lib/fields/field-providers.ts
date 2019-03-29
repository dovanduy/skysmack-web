import { Injectable } from '@angular/core';
import { FieldProvider } from './field-provider';

@Injectable({ providedIn: 'root' })
export class FieldProviders {
    public providers: FieldProvider[] = [];
    private register = {};

    public add(fp: FieldProvider) {
        const fpName = Object.getPrototypeOf(fp).constructor.name;
        const registered = this.register[fpName];
        if (!registered) {
            this.providers.push(fp);
            this.register[fpName] = fpName;
        }
    }
}
