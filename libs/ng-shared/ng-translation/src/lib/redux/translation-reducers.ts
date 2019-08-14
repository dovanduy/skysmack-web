import { sharedReducer } from '@skysmack/redux';
import { TranslationActions } from './translation-actions';

export class TranslationAppState {
    public translation: TranslationState;
}

export class TranslationState {
    public language: string = 'en';
}

export function translationReducer(state = new TranslationState(), action: any) {
    state = sharedReducer(state, action, new TranslationState(), 'translation');
    const newState = Object.assign({}, state);

    switch (action.type) {
        case TranslationActions.SET_LANGUAGE: {
            newState.language = action.payload;
            return newState;
        }
        default:
            return state;
    }
}
