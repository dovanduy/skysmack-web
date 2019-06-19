import { SignalRProvider } from '@skysmack/signal-r';

export class SignalRPersonProvider implements SignalRProvider {
    public name: string;

    constructor(values: Partial<SignalRProvider>) {
        Object.assign(this, values);
    }

    public messageProvided(message: any): void {
        if (message.type) {
            switch (message.type) {
                case 'Added': {
                    console.log(`Persons with id ${message.ids} was just created!`);
                    break;
                }
                case 'Updated': {
                    console.log(`Persons with id ${message.ids} was just updated!`);
                    break;
                }
                case 'Removed': {
                    console.log(`Persons with id ${message.ids} was just deleted!`);
                    break;
                }
                default: break;
            }
        }
    }
}
