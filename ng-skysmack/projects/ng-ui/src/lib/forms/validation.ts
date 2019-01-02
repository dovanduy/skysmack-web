import { StrIndex } from '@skysmack/framework';

export abstract class Validation {
    public abstract formErrors: StrIndex<{}>;
    public abstract validationMessages: StrIndex<{}>;
    public abstract area: string;
    public abstract formValidators: any[];

    public translateValidationMessages(): void {
        Object.keys(this.validationMessages).forEach(key => {
            Object.keys(this.validationMessages[key]).forEach(validatorKey => {
                const translationString = this.area.toUpperCase() + '.FORM.VALIDATION.' + key.toUpperCase() + '.' + validatorKey.toUpperCase();
                this.validationMessages[key][validatorKey] = translationString;
            });
        });
    }
}
