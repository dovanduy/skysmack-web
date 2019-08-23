import { DynamicDashboardDirective } from '../components/common/dashboard-loader/dynamic-dashboard.directive';
import { InAnyPermissionDirective } from '../authentication/in-any-permissions.directive';
import { InPermissionDirective } from '../authentication/in-permissions.directive';

export const directives = [
    DynamicDashboardDirective,
    InAnyPermissionDirective,
    InPermissionDirective
];
