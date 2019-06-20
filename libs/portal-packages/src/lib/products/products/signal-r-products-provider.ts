import { SignalRProvider } from '@skysmack/signal-r';
import { PRODUCTS_AREA_KEY } from 'libs/packages/products/src';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SignalRProductsProvider implements SignalRProvider {
    public name = PRODUCTS_AREA_KEY;

    constructor() { }

    public messageProvided(packagePath: string, message: any): void {
        if (message.type) {
            switch (message.type) {
                case 'Added': {
                    console.log(`Products with id ${message.ids} was just created!`)
                }
                default: break;
            }
        }
    }
}
