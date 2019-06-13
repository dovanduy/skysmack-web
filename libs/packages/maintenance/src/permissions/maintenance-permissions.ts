import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class MaintenancePermissions {
    private static assignments = 'Assignments';
    private static assignmentFields = 'Assignment' + FIELDS;

    private static assignmentTypes = 'Assignment types';
    private static assignmentTypeFields = 'Assignment type' + FIELDS;

    private static maintenanceStates = 'Maintenance States';
    private static recurringAssignments = 'Recurring Assignments';

    public static findAssignments = FIND + MaintenancePermissions.assignments;
    public static addAssignments = ADD + MaintenancePermissions.assignments;
    public static updateAssignments = UPDATE + MaintenancePermissions.assignments;
    public static removeAssignments = REMOVE + MaintenancePermissions.assignments;

    public static findAssignmentFields = FIND + MaintenancePermissions.assignmentFields;
    public static addAssignmentFields = ADD + MaintenancePermissions.assignmentFields;
    public static updateAssignmentFields = UPDATE + MaintenancePermissions.assignmentFields;
    public static removeAssignmentFields = REMOVE + MaintenancePermissions.assignmentFields;

    public static findAssignmentTypes = FIND + MaintenancePermissions.assignmentTypes;
    public static addAssignmentTypes = ADD + MaintenancePermissions.assignmentTypes;
    public static updateAssignmentTypes = UPDATE + MaintenancePermissions.assignmentTypes;
    public static removeAssignmentTypes = REMOVE + MaintenancePermissions.assignmentTypes;

    public static findAssignmentTypeFields = FIND + MaintenancePermissions.assignmentTypeFields;
    public static addAssignmentTypeFields = ADD + MaintenancePermissions.assignmentTypeFields;
    public static updateAssignmentTypeFields = UPDATE + MaintenancePermissions.assignmentTypeFields;
    public static removeAssignmentTypeFields = REMOVE + MaintenancePermissions.assignmentTypeFields;

    public static findMaintenanceStates = FIND + MaintenancePermissions.maintenanceStates;
    public static addMaintenanceStates = ADD + MaintenancePermissions.maintenanceStates;
    public static updateMaintenanceStates = UPDATE + MaintenancePermissions.maintenanceStates;
    public static removeMaintenanceStates = REMOVE + MaintenancePermissions.maintenanceStates;

    public static findRecurringAssignments = FIND + MaintenancePermissions.recurringAssignments;
    public static addRecurringAssignments = ADD + MaintenancePermissions.recurringAssignments;
    public static updateRecurringAssignments = UPDATE + MaintenancePermissions.recurringAssignments;
    public static removeRecurringAssignments = REMOVE + MaintenancePermissions.recurringAssignments;
}