import { IsAuthenticatedDirective } from '../autentication/is-authenticated.directive';
import { IsAnonymousDirective } from '../autentication/is-anonymous.directive';
import { IsAnyPermissionDirective } from '../autentication/in-any-permissions.directive';
import { InPermissionDirective } from '../autentication/in-permissions.directive';
import { DynamicFormFieldDirective } from '../components/field-components/dynamic-form-field.directive';

export const directives = [
    IsAuthenticatedDirective,
    IsAnonymousDirective,
    IsAnyPermissionDirective,
    InPermissionDirective,
    DynamicFormFieldDirective,
];