import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class MaintenancePermissions {
    private assignments = 'Assignments';
    private assignmentFields = 'Assignment' + FIELDS;

    private assignmentTypes = 'Assignment types';
    private assignmentTypeFields = 'Assignment type' + FIELDS;

    private maintenanceStates = 'Maintenance States';
    private recurringAssignments = 'Recurring Assignments';

    public findAssignments = FIND + this.assignments;
    public addAssignments = ADD + this.assignments;
    public updateAssignments = UPDATE + this.assignments;
    public removeAssignments = REMOVE + this.assignments;

    public findAssignmentFields = FIND + this.assignmentFields;
    public addAssignmentFields = ADD + this.assignmentFields;
    public updateAssignmentFields = UPDATE + this.assignmentFields;
    public removeAssignmentFields = REMOVE + this.assignmentFields;

    public findAssignmentTypes = FIND + this.assignmentTypes;
    public addAssignmentTypes = ADD + this.assignmentTypes;
    public updateAssignmentTypes = UPDATE + this.assignmentTypes;
    public removeAssignmentTypes = REMOVE + this.assignmentTypes;

    public findAssignmentTypeFields = FIND + this.assignmentTypeFields;
    public addAssignmentTypeFields = ADD + this.assignmentTypeFields;
    public updateAssignmentTypeFields = UPDATE + this.assignmentTypeFields;
    public removeAssignmentTypeFields = REMOVE + this.assignmentTypeFields;

    public findMaintenanceStates = FIND + this.maintenanceStates;
    public addMaintenanceStates = ADD + this.maintenanceStates;
    public updateMaintenanceStates = UPDATE + this.maintenanceStates;
    public removeMaintenanceStates = REMOVE + this.maintenanceStates;

    public findRecurringAssignments = FIND + this.recurringAssignments;
    public addRecurringAssignments = ADD + this.recurringAssignments;
    public updateRecurringAssignments = UPDATE + this.recurringAssignments;
    public removeRecurringAssignments = REMOVE + this.recurringAssignments;
}