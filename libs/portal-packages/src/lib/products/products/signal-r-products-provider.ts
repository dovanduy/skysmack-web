import { SignalRProvider } from '@skysmack/signal-r';

export class SignalRProductsProvider implements SignalRProvider {
    public name: string;

    constructor(values: Partial<SignalRProvider>) {
        Object.assign(this, values);
    }

    public messageProvided(message: any): void {
        if (message.type) {
            switch (message.type) {
                case 'ProductsCreated': {
                    console.log(`Products with id ${message.ids} was just created!`)
                }
                default: break;
            }
        }
    }
}
