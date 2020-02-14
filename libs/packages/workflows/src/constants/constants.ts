// Ensure reducer key is the same as the reducer name without the "Reducer" part.
export const WORKFLOWS_REDUCER_KEY = 'workflows';
export const WORKFLOWS_AREA_KEY = 'workflows'; // validation, store, menu
export const WORKFLOWS_REDUX_KEY = 'WORKFLOWS_'; // reducer prefix, action, epics, Requests
export const WORKFLOWS_ADDITIONAL_PATHS = []; // actions, requests

export const DEFINITIONS_REDUCER_KEY = 'workflowDefinitions';
export const DEFINITIONS_AREA_KEY = 'definitions'; // validation, store, menu
export const DEFINITIONS_REDUX_KEY = 'DEFINITIONS_'; // reducer prefix, action, epics, Requests
export const DEFINITIONS_ADDITIONAL_PATHS = [ 'definitions' ]; // actions, requests