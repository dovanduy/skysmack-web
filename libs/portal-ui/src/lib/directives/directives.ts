import { DynamicDashboardDirective } from '../components/common/dashboard-loader/dynamic-dashboard.directive';
import { InAnyPermissionDirective } from '../authentication/in-any-permissions.directive';
import { InPermissionDirective } from '../authentication/in-permissions.directive';
import { DynamicSummaryDirective } from '../components/display-components/summary-loader/dynamic-summary.directive';

export const directives = [
    DynamicDashboardDirective,
    DynamicSummaryDirective,
    InAnyPermissionDirective,
    InPermissionDirective
];
