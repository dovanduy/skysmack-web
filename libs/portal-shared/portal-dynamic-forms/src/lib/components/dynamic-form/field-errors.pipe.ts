import { Pipe, PipeTransform } from '@angular/core';
import { ApiError } from '@skysmack/framework';

/**
 * Use this pipe to show api errors that does not have a fieldKey associated with it.
 */
@Pipe({ name: 'fieldErrorsPipe' })
export class FieldErrorsPipe implements PipeTransform {
    // Return errors that has no field key.
    transform(apiError: ApiError): string[] {
        const valErrors = apiError.validationErrors;
        return Object.keys(valErrors).map(validationErrorKey => {
            const valError: { fieldKey: string, errors: string[] } = valErrors[validationErrorKey];
            if (valError.fieldKey === '') {
                return valError.errors;
            }
        }).reduce((a, b) => a.concat(b), []);
    }
}
