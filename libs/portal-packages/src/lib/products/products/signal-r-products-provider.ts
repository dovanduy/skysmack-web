import { SignalRProvider } from '@skysmack/signal-r';
import { Injectable } from '@angular/core';
import { PRODUCTS_AREA_KEY } from '@skysmack/packages-products';

@Injectable({ providedIn: 'root' })
export class SignalRProductsProvider implements SignalRProvider {
    public name = PRODUCTS_AREA_KEY;

    constructor() { }

    public messageProvided(packagePath: string, message: any): void {
        if (message.type) {
            switch (message.type) {
                case 'Added': {
                    // TODO: What to do?
                }
                default: break;
            }
        }
    }
}
