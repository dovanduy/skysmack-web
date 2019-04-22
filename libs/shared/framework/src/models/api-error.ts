import { ValidationError } from './validation-error';
import { HttpErrorResponse } from './http-error-response';

export class ApiError {
    public title: string;
    public status: number;
    public detail: string;
    public instance: string;
    public validationErrors: ValidationError[];

    constructor(response: HttpErrorResponse) {
        this.title = response && response.error && response.error.title;
        this.detail = response && response.error && response.error.detail;
        this.status = response && response.error && response.error.status;
        this.instance = response && response.error && response.error.instance;

        if (response && response.error && response.error.validationErrors) {
            this.validationErrors = Object.keys(response.error.validationErrors).map(validationErrorKey => {
                let fieldNameUpperCase = validationErrorKey.split('.')[1];
                let fieldKey;
                if (fieldNameUpperCase) {
                    const firstLetter = fieldNameUpperCase.charAt(0);
                    const lowercaseFirstLetter = fieldNameUpperCase.substr(0, 1).toLowerCase();
                    fieldKey = fieldNameUpperCase.replace(firstLetter, lowercaseFirstLetter);
                }

                return {
                    fieldKey,
                    errors: response.error.validationErrors[validationErrorKey]
                } as ValidationError;
            });
        } else {
            this.validationErrors = [];
        }
    }
}
