import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class MaintenancePermissions {
    private static singleAssignments = 'SingleAssignments';
    private static assignmentFields = 'Assignment' + FIELDS;

    private static assignmentTypes = 'AssignmentTypes';
    private static assignmentTypeFields = 'AssignmentType' + FIELDS;

    private static maintenanceStates = 'MaintenanceStates';
    private static assignmentSchedules = 'AssignmentSchedules';

    public static findSingleAssignments = FIND + MaintenancePermissions.singleAssignments;
    public static addSingleAssignments = ADD + MaintenancePermissions.singleAssignments;
    public static updateSingleAssignments = UPDATE + MaintenancePermissions.singleAssignments;
    public static removeSingleAssignments = REMOVE + MaintenancePermissions.singleAssignments;

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

    public static findAssignmentSchedules = FIND + MaintenancePermissions.assignmentSchedules;
    public static addAssignmentSchedules = ADD + MaintenancePermissions.assignmentSchedules;
    public static updateAssignmentSchedules = UPDATE + MaintenancePermissions.assignmentSchedules;
    public static removeAssignmentSchedules = REMOVE + MaintenancePermissions.assignmentSchedules;
}