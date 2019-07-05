import { IsAuthenticatedDirective } from '../authentication/is-authenticated.directive';
import { IsAnonymousDirective } from '../authentication/is-anonymous.directive';
import { IsAnyPermissionDirective } from '../authentication/in-any-permissions.directive';
import { InPermissionDirective } from '../authentication/in-permissions.directive';

export const directives = [
    IsAuthenticatedDirective,
    IsAnonymousDirective,
    IsAnyPermissionDirective,
    InPermissionDirective,
];