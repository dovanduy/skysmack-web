import { ValidationError } from './validation-error';
import { HttpErrorResponse } from './http-error-response';

export class ApiError {
    public title: string;
    public status: number;
    public detail: string;
    public instance: string;
    public validationErrors: ValidationError[];

    constructor(response: HttpErrorResponse) {
        this.title = response.error.title;
        this.detail = response.error.detail;
        this.status = response.error.status;
        this.instance = response.error.instance;
        this.validationErrors = Object.keys(response.error.validationErrors).map(validationErrorKey => {
            const fieldNameUpperCase = validationErrorKey.split('.')[1];
            const firstLetter = fieldNameUpperCase.charAt(0);
            const lowercaseFirstLetter = fieldNameUpperCase.substr(0, 1).toLowerCase();
            return {
                fieldKey: fieldNameUpperCase.replace(firstLetter, lowercaseFirstLetter),
                errors: response.error.validationErrors[validationErrorKey]
            } as ValidationError;
        });
    }
}
