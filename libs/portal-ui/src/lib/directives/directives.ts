import { IsAnyPermissionDirective } from '../authentication/in-any-permissions.directive';
import { InPermissionDirective } from '../authentication/in-permissions.directive';
import { DynamicDashboardDirective } from '../components/common/dashboard-loader/dynamic-dashboard.directive';
import { AllowAccessForDirective } from '../authentication';

export const directives = [
    IsAnyPermissionDirective,
    InPermissionDirective,
    DynamicDashboardDirective,
    AllowAccessForDirective
];