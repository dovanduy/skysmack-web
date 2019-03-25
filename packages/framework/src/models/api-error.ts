import { ValidationError } from './validation-error';

export class ApiError {
    public title: string;
    public status: number;
    public detail: string;
    public instance: string;
    public validationErrors: ValidationError[];
}
