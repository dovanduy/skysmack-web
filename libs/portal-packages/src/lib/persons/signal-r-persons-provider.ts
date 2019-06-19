import { SignalRProvider } from '@skysmack/signal-r';

export class SignalRPersonProvider implements SignalRProvider {
    public name: string;

    constructor(values: Partial<SignalRProvider>) {
        Object.assign(this, values);
    }

    public messageProvided(message: any): void {
        if (message.type) {
            switch (message.type) {
                case 'PersonsCreated': {
                    console.log(`Persons with id ${message.ids} was just created!`)
                }
                default: break;
            }
        }
    }
}
