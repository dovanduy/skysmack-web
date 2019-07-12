// Ensure reducer key is the same as the reducer name without the "Reducer" part.
export const EMAILS_REDUCER_KEY = 'emails';
export const EMAILS_AREA_KEY = 'emails'; // validation, store, menu
export const EMAILS_REDUX_KEY = 'EMAILS_'; // reducer prefix, action, epics, Requests
export const EMAILS_ADDITIONAL_PATHS = []; // actions, requests

export const EMAIL_TEMPLATES_REDUCER_KEY = 'emailTemplates';
export const EMAIL_TEMPLATES_AREA_KEY = 'email_templates'; // validation, store, menu
export const EMAIL_TEMPLATES_REDUX_KEY = 'EMAIL_TEMPLATES_'; // reducer prefix, action, epics, Requests
export const EMAIL_TEMPLATES_ADDITIONAL_PATHS = ['templates']; // actions, requests