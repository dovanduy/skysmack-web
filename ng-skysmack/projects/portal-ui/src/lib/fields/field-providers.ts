import { Injectable } from '@angular/core';
import { FieldProvider } from './field-provider';
import { StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class FieldProviders {
    public providers: StrIndex<FieldProvider[]> = {};
    private register = {};

    public add(type: string, fp: FieldProvider) {
        const fpName = Object.getPrototypeOf(fp).constructor.name;
        const registered = this.register[fpName];
        if (!registered) {
            if (!this.providers[type]) {
                this.providers[type] = [];
            }
            this.providers[type].push(fp);
            this.register[fpName] = fpName;
        }
    }
}
