import { FIND, ADD, UPDATE, REMOVE } from '@skysmack/framework';

export class WorkflowsPermissions {
    private static workflows = 'Workflows';

    public static findWorkflows = FIND + WorkflowsPermissions.workflows;
    public static addWorkflows = ADD + WorkflowsPermissions.workflows;
    public static updateWorkflows = UPDATE + WorkflowsPermissions.workflows;
    public static removeWorkflows = REMOVE + WorkflowsPermissions.workflows;
}