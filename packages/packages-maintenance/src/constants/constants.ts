// Ensure area key is the same as the reducer name without the "Reducer" part.
export const ASSIGNMENTS_AREA_KEY = 'assignments'; // validation, registerRedux, store, menu
export const ASSIGNMENTS_REDUX_KEY = 'ASSIGNMENTS_'; // reducer prefix, action, epics, Requests
export const ASSIGNMENTS_ADDITIONAL_PATHS = ['assignments']; // actions, requests

export const ASSIGNMENT_TYPES_AREA_KEY = 'assignment_types'; // validation, registerRedux, store, menu
export const ASSIGNMENT_TYPES_REDUX_KEY = 'ASSIGNMENT_TYPES_'; // reducer prefix, action, epics, Requests
export const ASSIGNMENT_TYPES_ADDITIONAL_PATHS = ['assignments', 'types']; // actions, requests

export const MAINTENANCE_STATES_AREA_KEY = 'maintenance_states'; // validation, registerRedux, store, menu
export const MAINTENANCE_STATES_REDUX_KEY = 'MAINTENANCE_STATES_'; // reducer prefix, action, epics, Requests
export const MAINTENANCE_STATES_ADDITIONAL_PATHS = []; // actions, requests

export const RECURRING_ASSIGNMENTS_AREA_KEY = 'recurring_assignments'; // validation, registerRedux, store, menu
export const RECURRING_ASSIGNMENTS_REDUX_KEY = 'RECURRING_ASSIGNMENTS_'; // reducer prefix, action, epics, Requests
export const RECURRING_ASSIGNMENTS_ADDITIONAL_PATHS = []; // actions, requests